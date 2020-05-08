module.exports = function detect_keypoints(img, corners, max_allowed) {
  let ic_angle = require('./icAngle.js');
  if (typeof jsfeat === 'undefined') var jsfeat = require('jsfeat');

  // detect features
  var count = jsfeat.yape06.detect(img, corners, 17);

  // sort by score and reduce the count if needed
  if (count > max_allowed) {
    jsfeat.math.qsort(corners, 0, count-1, function(a,b){return (b.score<a.score);});
    count = max_allowed;
  }

  // calculate dominant orientation for each keypoint
  for (var i = 0; i < count; ++i) {
    corners[i].angle = ic_angle(img, corners[i].x, corners[i].y);
  }

  return count;
}
