module.exports = function render_pattern_shape(ctx, shape_pts) {
  ctx.strokeStyle = "rgb(0,255,0)";
  ctx.beginPath();

  ctx.moveTo(shape_pts[0].x,shape_pts[0].y);
  ctx.lineTo(shape_pts[1].x,shape_pts[1].y);
  ctx.lineTo(shape_pts[2].x,shape_pts[2].y);
  ctx.lineTo(shape_pts[3].x,shape_pts[3].y);
  ctx.lineTo(shape_pts[0].x,shape_pts[0].y);

  ctx.lineWidth=4;
  ctx.stroke();
}
