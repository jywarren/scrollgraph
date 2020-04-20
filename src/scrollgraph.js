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
      matcher = require('./setupMatcher.js')(video, ctx, options); // initialize matcher and pass in the video element

      // start by matching against first
      matcher.train(video);

      // move loop logic out here
      matcher.match(video);


      // pass out the API so people can use it externally
      resolve(matcher);
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

  });
}
