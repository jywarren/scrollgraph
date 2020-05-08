// be 1.25x more lax if it's been a while since the last match:
module.exports = function filterFrame(results, options, lastFrame) {
  return (results.good_matches > options.goodMatchesMin ||
    Date.now() - lastFrame > 500 && 
    results.good_matches * 1.25 > options.goodMatchesMin) 
  && results.projected_corners
}
