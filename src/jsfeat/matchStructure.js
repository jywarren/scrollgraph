module.exports = (function () {
  function match_t(screen_idx, pattern_lev, pattern_idx, distance) {
    if (typeof screen_idx === "undefined") { screen_idx=0; }
    if (typeof pattern_lev === "undefined") { pattern_lev=0; }
    if (typeof pattern_idx === "undefined") { pattern_idx=0; }
    if (typeof distance === "undefined") { distance=0; }

    this.screen_idx = screen_idx;
    this.pattern_lev = pattern_lev;
    this.pattern_idx = pattern_idx;
    this.distance = distance;
  }
  return match_t;
})
