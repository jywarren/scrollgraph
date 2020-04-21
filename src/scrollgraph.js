Scrollgraph = function Scrollgraph(options) {
  var matcher,
      video = document.querySelector('video');
  let createCanvas = require('./createCanvas.js'),
      util = require('./util.js')(options);
  var ctx = createCanvas('canvas', options);

  options = require('./defaults.js')(options);

  return new Promise(function(resolve, reject) { 

    navigator.mediaDevices.getUserMedia(options.camera)
    .then(function(mediaStream) {
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };

      // turn off camera when done
      $(window).unload(function() {
        video.pause();
        video.src = null;
      });

      matcher = require('./setupMatcher.js')(options); // initialize matcher and pass in the video element

      // initiate first frame
      compatibility.requestAnimationFrame(draw);

      // start by matching against first
      var isFirst = true,
          offsetX = (options.width / 2) - (options.srcWidth / 2),
          offsetY = (options.height / 2) - (options.srcHeight / 2);

      function draw() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {

          if (isFirst) {
            matcher.train(video);
            ctx.drawImage(video, 
              offsetX,
              offsetY,
              options.srcWidth,
              options.srcHeight);
            isFirst = false;
          } else {

            var results = matcher.match(video);

            if (results.good_matches > options.goodMatchesMin && results.projectedCorners) {
              console.log('Good match!', results.good_matches);
 
              var avOffset = util.averageOffsets(results.projectedCorners);
              ctx.drawImage(video,
                offsetX - avOffset.x + (options.srcWidth / 2),
                offsetY - avOffset.y + (options.srcHeight / 2),
                options.srcWidth,
                options.srcHeight);

              // replace pattern image with newly matched image if 1.5x more good matches
              //if (results.good_matches > options.goodMatchesMin * 1.5) {
              //  matcher.train(video);
                // adjust offset to new origin
              //  offsetX += avOffset.x - (options.srcWidth / 2);
              //  offsetY += avOffset.y - (options.srcHeight / 2);
              //}
 
            }
          }
          compatibility.requestAnimationFrame(draw);

        } else { // try over again
          compatibility.requestAnimationFrame(draw);
        }
      }

      // pass out the API so people can use it externally
      resolve(matcher);
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

  });
}
