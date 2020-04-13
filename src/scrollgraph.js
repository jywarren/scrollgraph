Scrollgraph = async function Scrollgraph(options) {
  // make this non-global later
  ctx = createCanvas(options);

  ctx.fillStyle = '#eee'; // background
  ctx.fillRect(0, 0, options.width, options.height);

  ctx.moveTo(-options.width/2, -options.height/2);
  var canvasOffset = {
    x: options.width/2 - options.srcWidth/2,
    y: options.height/2 - options.srcHeight/2
  }
  var img1 = await drawImage(options.path1, canvasOffset);
  if (options.debug) var img2 = await drawImage(options.path2, {x: 801, y: 0}, canvasOffset);

  addImage(options, options.path2);

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
    offset = offset || {x: 0, y: 0};
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => {
        ctx.globalAlpha = 0.5;
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
        resolve(img)
      }
      img.src = src;
    })
  }

  function addImage(matcherOptions, imgSrc) {
    require('../node_modules/matcher-core/src/orb.core.js');
    var matcher = new Matcher(matcherOptions.path1, matcherOptions.path2,
      async function onMatches(q) {
        var res = await q;
        if (options.debug) console.log("points found", res);
        var points = sortByConfidence(res.matched_points);
        points = correctPoints(points, img1.width);
        // pointsWithOffset(points, canvasOffset);
        var angle = findAngle(points[0], points[1]);
        // this offset will only work for translation, not rotation
        var offset = getOffset(points[0]);

        drawImage(imgSrc, mergeOffsets(offset, canvasOffset));
        if (options.debug) require('./debug/annotate.js')(points);
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

  // adjust points from pattern-matching 512x512 pixel space (with its oddities and ambiguities)
  // to the input image pixel space(s)
  function correctPoints(points, width) {
    var ratio = width / 512; // ratio of source image to pattern-matching cavas
    var ratio2 = ratio / 1.25; // mysterious 1.25 factor off on 2nd image
    points.forEach(function(p, i) {
      p.x1 *= ratio;
      p.y1 *= ratio;
      p.x2 *= ratio2;
      p.y2 *= ratio2;
    });
    return points;
  }

  function mergeOffsets(oA, oB) {
    return {
      x: oA.x + oB.x,
      y: oA.y + oB.y
    }
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
