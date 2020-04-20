// central difference using image moments to find dominant orientation
var u_max = new Int32Array([15,15,15,15,14,14,14,13,13,12,11,10,9,8,6,3,0]);
module.exports = function ic_angle(img, px, py) {
  var half_k = 15; // half patch size
  var m_01 = 0, m_10 = 0;
  var src=img.data, step=img.cols;
  var u=0, v=0, center_off=(py*step + px)|0;
  var v_sum=0,d=0,val_plus=0,val_minus=0;

  // Treat the center line differently, v=0
  for (u = -half_k; u <= half_k; ++u)
    m_10 += u * src[center_off+u];

  // Go line by line in the circular patch
  for (v = 1; v <= half_k; ++v) {
    // Proceed over the two lines
    v_sum = 0;
    d = u_max[v];
    for (u = -d; u <= d; ++u) {
      val_plus = src[center_off+u+v*step];
      val_minus = src[center_off+u-v*step];
      v_sum += (val_plus - val_minus);
      m_10 += u * (val_plus + val_minus);
    }
    m_01 += v * v_sum;
  }

  return Math.atan2(m_01, m_10);
}
