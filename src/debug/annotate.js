function annotate(points) {
  setTimeout(function() {

    ctx.font = '14px sans';
    ctx.globalAlpha = 1;
 
    points.forEach(function(p, i) {
      ctx.save();
      ctx.beginPath();
 
      // first circle adjusted
      ctx.arc(p.x1, p.y1, 4, 0, Math.PI*2);
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
 
      ctx.moveTo(800 + p.x2, p.y2);
      ctx.lineTo(p.x1, p.y1);
      ctx.stroke();
 
      // second circle
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      ctx.arc(800 + p.x2, p.y2, 4, 0, Math.PI*2);
      ctx.stroke();
 
      // label
      ctx.beginPath();
      ctx.fillText(i+'/'+parseInt(p.confidence.c1+p.confidence.c2), p.x1, p.y1);
      ctx.fill();
 
      ctx.restore();
    });
  },2500)
}
module.exports = annotate;
