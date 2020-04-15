module.exports = async function addImage(options, img1, img2, ctx) {
  //require('../node_modules/matcher-core/src/orb.core.js');
  require('../../matcher-core/src/orb.core.js');

  if (img1 instanceof String) img1 = await loadImage(img1);
  if (img2 instanceof String) img2 = await loadImage(img2);

  var matcher = new Matcher(img1, img2,
    async function onMatches(q) {
      let util = require('./util.js')(options),
          drawImage = require('./drawImage.js');
      var res = await q;
      if (options.debug) console.log("points found", res);
      var points = util.sortByConfidence(res.matched_points);
      points = util.correctPoints(points, options.srcWidth);
      // pointsWithOffset(points, options.canvasOffset);
      //var angle = util.findAngle(points[0], points[1]);
      // this offset will only work for translation, not rotation
      var offsets = [];
      var minConfidence = 100;
      function filterPoints(_points) {
        if (_points.confidence.c1 > minConfidence && _points.confidence.c2) offsets.push(util.getOffset(_points));
      }
      filterPoints(points[0]);
      filterPoints(points[1]);
      filterPoints(points[2]);
      filterPoints(points[3]);
console.log(offsets.length + ' points added');

      var offset = util.averageOffsets(offsets);

      drawImage(ctx, img2.src, util.sumOffsets(offset, options.canvasOffset));
      if (options.debug) require('./debug/annotate.js')(points, ctx);
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
