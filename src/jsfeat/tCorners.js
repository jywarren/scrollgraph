// project/transform rectangle corners with 3x3 Matrix
module.exports = function tCorners(M, w, h) {
  var pt = [ {'x':0,'y':0}, {'x':w,'y':0}, {'x':w,'y':h}, {'x':0,'y':h} ];
  var z=0.0, i=0, px=0.0, py=0.0;

  for (; i < 4; ++i) {
    px = M[0]*pt[i].x + M[1]*pt[i].y + M[2];
    py = M[3]*pt[i].x + M[4]*pt[i].y + M[5];
    z = M[6]*pt[i].x + M[7]*pt[i].y + M[8];
    pt[i].x = px/z;
    pt[i].y = py/z;
  }

  return pt;
}
