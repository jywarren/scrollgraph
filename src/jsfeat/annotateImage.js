module.exports = function annotate_image(ctx, imageData, matches, num_matches, num_corners, good_matches, screen_corners, pattern_corners, shape_pts, pattern_preview, match_mask, offset, options) {
  offset = offset || {x: 0, y:0};
  let render_corners = require('./renderCorners.js'); 
  let render_matches = require('./renderMatches.js'); 
  let render_pattern_shape = require('./renderPatternShape.js'); 

  var data_u32 = new Uint32Array(imageData.data.buffer); // new image structure
 
  ctx.fillStyle = "rgb(0,255,0)";
  ctx.strokeStyle = "rgb(0,255,0)";

  // mark found points in imageData to be put onto canvas
  render_corners(screen_corners, num_corners, data_u32, options.srcWidth);

  // putImageData doesn't respect ctx.translate!!!
  var workingCanvas = document.getElementById('workingCanvas');
  var workingCtx = workingCanvas.getContext('2d');
  workingCtx.putImageData(imageData, 0, 0); // write annotations and preview image back onto canvas
  // transfer to a working canvas so we can rotate it
  ctx.drawImage(workingCanvas, 0, 0, options.srcWidth, options.srcHeight,
                               0, 0, options.srcWidth, options.srcHeight);

//  if (num_matches) {
    // connect points with lines:
//    render_matches(ctx, matches, num_matches, screen_corners, pattern_corners, match_mask);
//    if (good_matches > 8)
//      render_pattern_shape(ctx, shape_pts); // draw a distorted frame
//  }
}
