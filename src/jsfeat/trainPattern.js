module.exports = function trainPattern(self) {
  let jsfeat = require('jsfeat');
  var img_u8;

  self.addEventListener('message', function incomingMessage(request) {

    if (typeof img_u8 === "undefined") img_u8 = new jsfeat.matrix_t(request.data.options.srcWidth, request.data.options.srcHeight, jsfeat.U8_t | jsfeat.C1_t);

    // reply back from this worker to the main thread:
    self.postMessage(setupTrainPattern(
      request.data.img_u8_buffer,
      request.data.pattern_corners,
      request.data.pattern_preview,
      request.data.pattern_descriptors,
      request.data.imageData,
      request.data.options)); // remember that these values are all cloned, so won't see later changes
  });

  function setupTrainPattern(img_u8_buffer, pattern_corners, pattern_preview, pattern_descriptors, imageData, options) {
    let detect_keypoints = require('./detectKeypoints.js');

    // try overwriting buffer:
    img_u8.buffer = img_u8_buffer;
 
    var lev=0, i=0;
    var sc = 1.0;
    var max_pattern_size = 512;
    var max_per_level = 300;
    var sc_inc = Math.sqrt(2.0); // magic number ;)
    var lev0_img = new jsfeat.matrix_t(img_u8.cols, img_u8.rows, jsfeat.U8_t | jsfeat.C1_t);
    var lev_img = new jsfeat.matrix_t(img_u8.cols, img_u8.rows, jsfeat.U8_t | jsfeat.C1_t);
    var new_width = 0, new_height = 0;
    var lev_corners, lev_descr;
    var corners_num=0;
 
    var sc0 = Math.min(max_pattern_size/img_u8.cols, max_pattern_size/img_u8.rows);
    new_width = (img_u8.cols*sc0)|0;
    new_height = (img_u8.rows*sc0)|0;

    // to counteract the offset caused by trainingMargin
    var xOffset = options.trainingMargin * options.srcWidth;
    var yOffset = options.trainingMargin * options.srcHeight;
 
    // start processing new image
    jsfeat.imgproc.grayscale(imageData, options.srcWidth, options.srcHeight, img_u8);
 
    jsfeat.imgproc.resample(img_u8, lev0_img, new_width, new_height);
 
    // prepare preview
    pattern_preview = new jsfeat.matrix_t(new_width>>1, new_height>>1, jsfeat.U8_t | jsfeat.C1_t);
    jsfeat.imgproc.pyrdown(lev0_img, pattern_preview);
 
    for (lev=0; lev < options.num_train_levels; ++lev) {
      pattern_corners[lev] = [];
      lev_corners = pattern_corners[lev];
 
      // preallocate corners array
      i = (new_width*new_height) >> lev;
      while (--i >= 0) {
        lev_corners[i] = new jsfeat.keypoint_t(0,0,0,0,-1);
      }
 
      pattern_descriptors[lev] = new jsfeat.matrix_t(32, max_per_level, jsfeat.U8_t | jsfeat.C1_t);
    }
 
    // do the first level
    lev_corners = pattern_corners[0];
    lev_descr = pattern_descriptors[0];
 
    // begin analyzing image
    jsfeat.imgproc.gaussian_blur(lev0_img, lev_img, options.blur_size|0); // this is more robust
    corners_num = detect_keypoints(lev_img, lev_corners, max_per_level);
    jsfeat.orb.describe(lev_img, lev_corners, corners_num, lev_descr);
 
    console.log("train " + lev_img.cols + "x" + lev_img.rows + " points: " + corners_num);

    // fix the coordinates due to zoom-in on point finding
    for (i = 0; i < lev_corners.length; ++i) {
      lev_corners[i].x *= 1 / (1 + (options.trainingMargin * 2));
      lev_corners[i].y *= 1 / (1 + (options.trainingMargin * 2));
      lev_corners[i].x += xOffset;
      lev_corners[i].y += yOffset;
    }
 
    sc /= sc_inc;
 
    // lets do multiple scale levels
    // we can use Canvas context draw method for faster resize
    // but its nice to demonstrate that you can do everything with jsfeat
    for (lev = 1; lev < options.num_train_levels; ++lev) {
      lev_corners = pattern_corners[lev];
      lev_descr = pattern_descriptors[lev];
 
      new_width = (lev0_img.cols*sc)|0;
      new_height = (lev0_img.rows*sc)|0;
 
      jsfeat.imgproc.resample(lev0_img, lev_img, new_width, new_height);
      jsfeat.imgproc.gaussian_blur(lev_img, lev_img, options.blur_size|0);
      corners_num = detect_keypoints(lev_img, lev_corners, max_per_level);
      jsfeat.orb.describe(lev_img, lev_corners, corners_num, lev_descr);
 
      // fix the coordinates due to scale level
      for (i = 0; i < corners_num; ++i) {
        lev_corners[i].x *= 1./sc;
        lev_corners[i].y *= 1./sc;
        // fix the coordinates due to zoom-in on point finding
        lev_corners[i].x *= 1 / (1 + (options.trainingMargin * 2));
        lev_corners[i].y *= 1 / (1 + (options.trainingMargin * 2));
        lev_corners[i].x += xOffset;
        lev_corners[i].y += yOffset;
        lev_corners[i].x += xOffset;
        lev_corners[i].y += yOffset;
      }
 
      console.log("train " + lev_img.cols + "x" + lev_img.rows + " points: " + corners_num);
 
      sc /= sc_inc;
    }
 
    return {
      pattern_corners: pattern_corners,
      pattern_preview: pattern_preview,
      pattern_descriptors: pattern_descriptors
    }
  }
}
