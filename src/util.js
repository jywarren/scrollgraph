module.exports = function util(options) {

  // https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  function averageOffsets(offsets) {
    var x = 0, y = 0;
    offsets.forEach(function(offset) {
      x += offset.x;
      y += offset.y;
    });    
    return {
      x: x / offsets.length,
      y: y / offsets.length
    }
  }

  function sumOffsets(oA, oB) {
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

  return {
    delay: delay,
    averageOffsets: averageOffsets,
    correctPoints: correctPoints,
    sumOffsets: sumOffsets,
    sortByConfidence: sortByConfidence,
    getOffset: getOffset,
    findAngle: findAngle
  }
}
