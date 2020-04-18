module.exports = async function addImage(options, img1, img2, ctx) {
  //require('../node_modules/matcher-core/src/orb.core.js');
  require('../../matcher-core/src/orb.core.js');

  if (img1 instanceof String) img1 = await loadImage(img1);
  if (img2 instanceof String) img2 = await loadImage(img2);
  if (options.debug) console.log('start match');

  var matcher = new Matcher(img1, img2,
    async function onMatches(q) {
      let util = require('./util.js')(options),
          drawImage = require('./drawImage.js');
      var res = await q;
      if (options.debug) console.log("points found", res);
      var points = util.sortByConfidence(res.matched_points);
      points = util.correctPoints(points, options.srcWidth);
      //var angle = util.findAngle(points[0], points[1]);
      // this offset will only work for translation, not rotation

      var offsets = [],
          selectedPoints = [];
      options.minConfidence = options.minConfidence || 100;
      options.maxPointsCount = options.maxPointsCount || 4;
      options.minPointsCount = options.minPointsCount || 2;

      function filterPoints(_pair) {
        if (_pair.confidence.c1 > options.minConfidence && _pair.confidence.c2 > options.minConfidence) {
          offsets.push(util.getOffset(_pair));
          selectedPoints.push(_pair);
        }
      }

      for (var i = 0; i < options.maxPointsCount && i < points.length; i++) {
        filterPoints(points[i]);
      }
      var offset = util.averageOffsets(offsets);
      console.log(offsets.length + ' points, offset:', offset);

      var accepted = selectedPoints.length >= options.minPointsCount;
      if (accepted) {
        // we update the overall canvas offset to center on this image
        options.canvasOffset = util.sumOffsets(offset, options.canvasOffset);
        drawImage(ctx, img2.src, options.canvasOffset);
      }
      // resolve(accepted); // not sure of syntax...
      if (options.debug) require('./debug/annotate.js')(selectedPoints, ctx, util.sumOffsets(offset, options.canvasOffset));
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
  window.requestAnimationFrame(matcher.initialize);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve(img)
    img.src = src;
  });
}
