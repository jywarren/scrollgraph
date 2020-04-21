// estimate homography transform between matched points
module.exports = function find_transform(matches, count, screen_corners, pattern_corners, homo3x3, match_mask) {
  // motion kernel
  var mm_kernel = new jsfeat.motion_model.homography2d();
  // ransac params
  var num_model_points = 4;
  var reproj_threshold = 3;
  var ransac_param = new jsfeat.ransac_params_t(num_model_points,
                                                reproj_threshold, 0.5, 0.99);

  var pattern_xy = [];
  var screen_xy = [];

  // construct correspondences
  for (var i = 0; i < count; ++i) {
    var m = matches[i];
    var s_kp = screen_corners[m.screen_idx];
    var p_kp = pattern_corners[m.pattern_lev][m.pattern_idx];
    pattern_xy[i] = {"x":p_kp.x, "y":p_kp.y};
    screen_xy[i] =  {"x":s_kp.x, "y":s_kp.y};
  }

  // estimate motion
  var ok = false;
  ok = jsfeat.motion_estimator.ransac(ransac_param, mm_kernel,
                                      pattern_xy, screen_xy, count, homo3x3, match_mask, 1000);

  // extract good matches and re-estimate
  var good_cnt = 0;
  if (ok) {
    for (var i=0; i < count; ++i) {
      if (match_mask.data[i]) {
        pattern_xy[good_cnt].x = pattern_xy[i].x;
        pattern_xy[good_cnt].y = pattern_xy[i].y;
        screen_xy[good_cnt].x = screen_xy[i].x;
        screen_xy[good_cnt].y = screen_xy[i].y;
        good_cnt++;
      }
    }
    // run kernel directly with inliers only
    mm_kernel.run(pattern_xy, screen_xy, homo3x3, good_cnt);
  } else {
    jsfeat.matmath.identity_3x3(homo3x3, 1.0);
  }

  return good_cnt;
}
