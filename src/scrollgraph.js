Scrollgraph = function Scrollgraph(options) {
  options.sourceWidth = options.sourceWidth || 800;
  options.sourceHeight = options.sourceHeight || 600;
  var ctx = createCanvas(options);

  // background
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, options.width, options.height);

//  ctx.moveTo(-options.width/2, -options.height/2);
  drawImage(options.path1);

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
    $(canvas).css('height', $(canvas).width() + 'px');
    return _ctx;
  }

  function drawImage(src, offset) {
    var img = new Image();
    offset = offset || {x: 0, y: 0};
    // transfrom offsets from 640x480 space to native image dimensions space
//offset.x *= 480/640
// need less x
    offset.x = (offset.x/640) * options.sourceWidth;
// need more y
    offset.y = (offset.y/480) * options.sourceHeight;
//console.log('transformed offest', offset);
    img.onload = function loadImage() {
      ctx.globalAlpha = 0.5;
console.log(img.width, img.height, img.src, offset);
      ctx.drawImage(
        img,
        0, 0,
        img.width,
        img.height,
        offset.x,
        offset.y,
        img.width,
        img.height
      );
    }
    img.src = src;
  }

  function setupMatcher(matcherOptions) {
    //var Matcher = require('matcher-core');
    require('../node_modules/matcher-core/src/orb.core.js');
    var matcher = new Matcher(matcherOptions.path1, matcherOptions.path2,
      async function onMatches(q) {
        var res = await q;
        console.log("points found", res);
        var points = sortByConfidence(res.matched_points);
        var angle = findAngle(points[0], points[1]);
        // this offset will only work for translation, not rotation
        var offset = getOffset(points[0]);
        var offset2 = getOffset(points[0]);
console.log(offset, offset2);
        offset.x = (offset.x + offset2.x) / 2;
        offset.y = (offset.y + offset2.y) / 2;

        drawImage(matcherOptions.path2, offset);

setTimeout(function() {
// let's draw our pairs
ctx.fillStyle = 'red';
ctx.strokeStyle = 'red';
ctx.font = '14px sans';
ctx.globalAlpha = 1;
points.forEach(function(p, i) {
    p.x1 = p.x1/640 * options.sourceWidth;
    p.y1 = p.y1/480 * options.sourceHeight;
    p.x2 = p.x2/640 * options.sourceWidth;
    p.y2 = p.y2/480 * options.sourceHeight;
    ctx.beginPath();
    ctx.moveTo(p.x1, p.y1);
    ctx.lineTo(p.x1 + p.x1 - p.x2, p.y1 + p.y1 - p.y2);
    ctx.stroke();
    ctx.fillText(i+'/'+p.confidence.c2, p.x1, p.y1);
    ctx.fill();
});
},1500)

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

  function sortByConfidence(points) {
    return points.sort(function(a, b) {
      if (a.confidence.c1 + a.confidence.c2 < b.confidence.c1 + b.confidence.c2) return 1;
      else return -1;
    });
  }

  function getOffset(points) {
    return {
      x: points.x1 - points.x2,
      y: points.y1 - points.y2,
    };
  }

  // in degrees; alternatively var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  // not doing this yet as we're only doing translation
  function findAngle(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;    
  }

  // currently as imageData
  function getCanvasAsImage() {
    return ctx.getImageData(0, 0, options.width || 1000, options.height || 1000);
  }

  return {
    getCanvasAsImage: getCanvasAsImage
  }
}
