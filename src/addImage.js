module.exports = function addImage(options, imgSrc, ctx) {
  require('../node_modules/matcher-core/src/orb.core.js');
  var matcher = new Matcher(options.path1, options.path2,
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
      var offset = util.averageOffsets([
        util.getOffset(points[0]),
        util.getOffset(points[1]),
        util.getOffset(points[2])
      ]);

      drawImage(ctx, imgSrc, util.sumOffsets(offset, options.canvasOffset));
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
