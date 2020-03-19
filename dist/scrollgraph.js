/*

https://github.com/publiclab/matcher-core

* create a canvas
* be able to insert an image onto it
* store previous image in a stack, n deep, and x,y location
* be able to fetch current canvas as an image (as a fallback)
* use Matcher to find matches

Setup

* get canvas working with dummy image
* get matcher working with 2 images

Phase 1

* place image at x,y relative to orig image
* don't yet try to use whole canvas, just use last image
* don't rotate or anything yet

Phase 2

* try to distort image using webgl-distort before placement
* place using upper-left corner



*/

function Scrollgraph(options) {

  var ctx;

  ctx = createCanvas(options);

  // background
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, options.width, options.height);

  var img = new Image();
  img.onload = function loadImage() {
    ctx.drawImage(img, 0, 0, options.width, options.height, 0, 0, options.width, options.height);
console.log(img);
  }
  img.src = "images/forms.png";

  function createCanvas(canvasOptions) {
    var _ctx, canvas, height, width;
    canvasOptions.canvasId = canvasOptions.canvasId || "canvas";
    canvas = document.getElementById(canvasOptions.canvasId);
    _ctx = canvas.getContext("2d");
    width = canvasOptions.width || 1000;
    height = canvasOptions.height || 1000;
    canvas.width = width;
    canvas.height = height;
    return _ctx;
  }

  function getCanvasAsImage(options) {
    return ctx.getImageData(0, 0, options.width || 1000, options.height || 1000);
  }

  function setupMatcher(matcherOptions) {
    var Matcher = require('matcher-core');
    var matcher = new Matcher(matcherOptions.path1, matcherOptions.path2,
      async function (r) { // r here is the passed utils object
        res = await r;
        console.log(res.points);
        console.log(res.matched_points);
    });
  }

}
