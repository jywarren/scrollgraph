module.exports = function render_mono_image(src, dst, sw, sh, dw) {
  var alpha = (0xff << 24);
  for(var i = 0; i < sh; ++i) {
    for(var j = 0; j < sw; ++j) {
      var pix = src[i*sw+j];
      dst[i*dw+j] = alpha | (pix << 16) | (pix << 8) | pix;
    }
  }
}
