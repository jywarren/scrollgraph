Scrollgraph = async function Scrollgraph(options) {
  require('../node_modules/matcher-core/src/orb.core.js');
  var drawImage = require('./drawImage.js');
  let createCanvas = require('./createCanvas.js'),
      util = require('./util.js')(options),
      addImage = require('./addImage.js');

  var ctx = createCanvas(options);
  options.canvasOffset = options.canvasOffset || {
    x: options.width/2 - options.srcWidth/2,
    y: options.height/2 - options.srcHeight/2
  }

  // Prefer camera resolution nearest to 1280x720.
  options.camera = options.camera || { audio: false, video: { width: 800, height: 600, facingMode: "environment" } }; 

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
  delay = 1000;
  setTimeout(placeImage, delay);

  // run this each time we get a new image
  function placeImage() {
    window.requestAnimationFrame(async function onFrame() {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        let img = await require('./videoToImage')(video);
        if (isFirst) {
          prevImg = await drawImage(ctx, img.src, options.canvasOffset);
          isFirst = false;
        } else {
          addImage(options, prevImg, img, ctx);
          prevImg = img; // we may want to make this contingent on whether the image was added
        }
      }
      setTimeout(placeImage, delay);
    });
  }

}
