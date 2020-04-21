module.exports = function render_matches(ctx, matches, count, screen_corners, pattern_corners, match_mask) {
  for(var i = 0; i < count; ++i) {
    var m = matches[i];
    var s_kp = screen_corners[m.screen_idx];
    var p_kp = pattern_corners[m.pattern_lev][m.pattern_idx];
    if(match_mask.data[i]) {
      ctx.strokeStyle = "rgb(0,255,0)";
    } else {
      ctx.strokeStyle = "rgb(255,0,0)";
    }
    ctx.beginPath();
    ctx.moveTo(s_kp.x,s_kp.y);
    ctx.lineTo(p_kp.x*0.5, p_kp.y*0.5); // our preview is downscaled
    ctx.lineWidth=1;
    ctx.stroke();
  }
}
