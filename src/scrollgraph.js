/*

https://github.com/publiclab/matcher-core
Reference implementation: https://github.com/publiclab/Leaflet.DistortableImage/pull/312

* create a canvas
* be able to insert an image onto it
* store previous image in a stack, n deep, and x,y location
* be able to fetch current canvas as an image (as a fallback)
* use Matcher to find matches

Setup

X get canvas working with dummy image
X get matcher working with 2 images

{
confidence: {c1: 306, c2: 309}
x1: 237
y1: 353
x2: 339
y2: 277
population: 10
}

Phase 1

* place image at x,y relative to orig image
  * idea 1: 
    * find best 2 matches (see sorting by confidence here: https://github.com/publiclab/Leaflet.DistortableImage/pull/312/files#diff-edfdd198986795d35dcb901669e98a76R71-R73)
    * calculate rotation change
    * calculate scale change
    * simple version: rotate and scale each point with regard to the best matched point pair: https://github.com/publiclab/Leaflet.DistortableImage/pull/312/files#diff-e34c8bba204508e1ca7a769871a3800eR81-R99
    * use rotation and scale change for a matrix transform?
	* this is called a homography matrix and a homography transform; example here: https://www.mathworks.com/matlabcentral/answers/26141-homography-matrix
* don't yet try to use whole canvas, just use last image
* don't rotate or anything yet

Phase 2

* try to distort image using webgl-distort before placement
* place using upper-left corner

*/

Scrollgraph = function Scrollgraph(options) {

  var ctx;

  ctx = createCanvas(options);

  // background
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, options.width, options.height);

  setupMatcher(options);

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

  function drawImage(src) {
    var img = new Image();
    img.onload = function loadImage() {
      ctx.drawImage(img, 0, 0, options.width, options.height, 0, 0, options.width, options.height);
    }
    img.src = src;
  }

  // currently as imageData
  function getCanvasAsImage() {
    return ctx.getImageData(0, 0, options.width || 1000, options.height || 1000);
  }

  function setupMatcher(matcherOptions) {
    //var Matcher = require('matcher-core');
    require('../node_modules/matcher-core/src/orb.core.js');
    var matcher = new Matcher(matcherOptions.path1, matcherOptions.path2,
      async function(q) {
        var res = await q;
        console.log("points found", res);
        // function drawImage(src)
        // res.points;
        // res.matched_points;
      },
      {
        browser: true,
        leniency: 30,
        params: {
          lap_thres: 30,
          eigen_thres: 35
        }
      }
    );
  }

  return {
    getCanvasAsImage: getCanvasAsImage
  }
}
