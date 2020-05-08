// new keyframe if:
// 1. <keyframeThreshold> more good matches
// 2. more than options.keyframeDistanceThreshold out from original image position
// 3. more than 1000ms since last keyframe
// 4. over 100 points available to match from
module.exports = function filterKeyframe(results, options, lastKeyframe) {
  results.distFromKeyframe = parseInt(Math.abs(results.projected_corners[0].x) + Math.abs(results.projected_corners[0].y));
  console.log (
results.good_matches + '/' + options.goodMatchesMin * options.keyframeThreshold, 
results.distFromKeyframe + '/' + options.keyframeDistanceThreshold,
Date.now() - lastKeyframe > 500,

    results.num_corners + ' corners', (
    results.good_matches > options.goodMatchesMin * options.keyframeThreshold && 
    results.distFromKeyframe > options.keyframeDistanceThreshold && 
    Date.now() - lastKeyframe > 500 &&
    results.num_corners > 100
  ));

  return (
    results.good_matches > options.goodMatchesMin * options.keyframeThreshold && 
    results.distFromKeyframe > options.keyframeDistanceThreshold && 
    Date.now() - lastKeyframe > 500 &&
    results.num_corners > 100
  )
}
