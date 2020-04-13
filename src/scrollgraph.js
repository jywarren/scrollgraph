Scrollgraph = function Scrollgraph(options) {
  ctx = createCanvas(options);

  // background
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, options.width, options.height);

//  ctx.moveTo(-options.width/2, -options.height/2);
  var img1 = drawImage(options.path1);
  var img2 = drawImage(options.path2, {x: 801, y: 0});

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
    img.onload = function loadImage() {
//      ctx.globalAlpha = 0.5;
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
    return img;
  }

  function setupMatcher(matcherOptions) {
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

        //drawImage(matcherOptions.path2, offset);

setTimeout(function() {
        var ratio = img1.width / 512; // ratio of source image to pattern-matching cavas
console.log('ratio ', ratio, ' width: ', img1.width);

  ctx.font = '14px sans';
  ctx.globalAlpha = 1;

  points.forEach(function(p, i) {
    ctx.save();
    ctx.beginPath();

    var ratio2 = ratio / 1.25; // mysterious 1.25 factor off on 2nd image

    // first circle adjusted
    ctx.arc(p.x1 * ratio, p.y1 * ratio, 4, 0, Math.PI*2);
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'red';

    ctx.moveTo(800 + p.x2 * ratio2, p.y2 * ratio2);
    ctx.lineTo(p.x1 * ratio, p.y1 * ratio);
    ctx.stroke();

    // second circle
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.arc(800 + p.x2 * ratio2, p.y2 * ratio2, 4, 0, Math.PI*2);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillText(i+'/'+parseInt(p.confidence.c1+p.confidence.c2), p.x1*options.xAdjust, p.y1*options.yAdjust);
    ctx.fill();

    ctx.restore();
});
},2500)

      },
      {
        browser: true,
        leniency: 30,
        dimensions: options.dimensions || [640, 480],
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
