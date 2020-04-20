Scrollgraph = function Scrollgraph(options) {
  var drawImage = require('./drawImage.js');
  var matcher,
      video = document.querySelector('video');
  let createCanvas = require('./createCanvas.js'),
      util = require('./util.js')(options),
      addImage = require('./addImage.js');
  var ctx = createCanvas(options);

// REFACTOR into defaults.js
  options.delay = options.delay || 1000;
  options.annotations = options.annotations || true;
  options.srcWidth = options.srcWidth || 800;
  options.srcHeight = options.srcHeight || 600; 
  options.canvasOffset = options.canvasOffset || {
    x: options.width/2 - options.srcWidth/2,
    y: options.height/2 - options.srcHeight/2
  }
  // Prefer camera resolution nearest to 1280x720.
  options.camera = options.camera || { audio: false, video: { 
    width: options.srcWidth,
    height: options.srcHeight, 
    facingMode: "environment"
  } }; 

  return new Promise(function(resolve, reject) { 

// BEGIN refactor into video handler submodule

  navigator.mediaDevices.getUserMedia(options.camera)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
    matcher = require('./setupMatcher.js')(video, ctx, options); // initialize matcher and pass in the video element
    resolve(matcher);
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

// END refactor into video handler init script

  });

/**
  var prevImg;
  var isFirst = true;

  // startup
  setTimeout(placeImage, options.delay + 1000);

  // run this each time we get a new image
  function placeImage() {
    window.requestAnimationFrame(async function onFrame() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (isFirst) {
          // insert initial delay to allow camera to reach stable exposure
          await utils.delay(1000);
          let img = await require('./videoToImage')(video);
          prevImg = await drawImage(ctx, img.src, options.canvasOffset);
          isFirst = false;
          setTimeout(placeImage, options.delay);
        } else {
          let img = await require('./videoToImage')(video);
          addImage(options, prevImg, img, ctx).then(function(response) {
            console.log('completed match process', response);
            setTimeout(placeImage, options.delay);
            prevImg = img;
          });
        }
      } else {
        setTimeout(placeImage, 100); // retry until we get video.readyState == 4
      }
    });
  }
*/

}
