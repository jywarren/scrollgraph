Scrollgraph = function Scrollgraph(options) {
  var drawImage = require('./drawImage.js'),
      matcher,
      video = document.querySelector('video');
  let createCanvas = require('./createCanvas.js'),
      util = require('./util.js')(options),
      addImage = require('./addImage.js');
  var ctx = createCanvas(options);

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

      matcher = require('./setupMatcher.js')(ctx, options); // initialize matcher and pass in the video element

      // initiate first frame
      compatibility.requestAnimationFrame(draw);

      // start by matching against first
      compatibility.requestAnimationFrame(function() {
        matcher.train(video);
      });

      function draw() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {

          var results = matcher.match(video);
          if (results.good_matches > 8) {
            // do something with results.shape_pts
            console.log('good!', results.shape_pts);

            matcher.train(video);
          } else {
            console.log('no good matches');
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
