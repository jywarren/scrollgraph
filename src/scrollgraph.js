Scrollgraph = async function Scrollgraph(options) {
  require('../node_modules/matcher-core/src/orb.core.js');
  var drawImage = require('./drawImage.js');
  let createCanvas = require('./createCanvas.js'),
      util = require('./util.js')(options),
      addImage = require('./addImage.js');

  var ctx = createCanvas(options);
  options.delay = options.delay || 1000;
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

  navigator.mediaDevices.getUserMedia(options.camera)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

  var prevImg;
  var video = document.querySelector('video');
  var isFirst = true;
  setTimeout(placeImage, options.delay + 1000);

  // run this each time we get a new image
  function placeImage() {
    window.requestAnimationFrame(async function onFrame() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        if (isFirst) {
          // insert initial delay to allow camera to reach stable exposure
          await delay(1000);
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
        setTimeout(placeImage, 100); // retry
      }
    });
  }

}

// https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
