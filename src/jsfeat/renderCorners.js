// draws tiny +s on the canvas where there are corners
module.exports = function render_corners(corners, count, img, step) {
  var pix = (0xff << 24) | (0x00 << 16) | (0xff << 8) | 0x00;
  for (var i=0; i < count; ++i) {
    var x = corners[i].x;
    var y = corners[i].y;
    var off = (x + y * step);
    img[off] = pix;
    img[off-1] = pix;
    img[off+1] = pix;
    img[off-step] = pix;
    img[off+step] = pix;
  }
}
