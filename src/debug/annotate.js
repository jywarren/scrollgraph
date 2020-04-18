function annotate(points, ctx, offset) {
  setTimeout(function() {

    ctx.font = '14px sans';
    ctx.globalAlpha = 1;
 
    points.forEach(markPoints);

    function markPoints(p, i) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'red';
 
      // first circle adjusted
      ctx.arc(p.x1 + offset.x, p.y1 + offset.y, 6, 0, Math.PI*2);
      ctx.stroke();
 
      // label
      //ctx.fillText(i+'/'+parseInt(p.confidence.c1+p.confidence.c2), p.x1, p.y1);
      //ctx.fill();
 
      ctx.restore();
    }

    // this was for displaying 2 images side by side, 800px offset
    function sidebyside(p, i) {
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
    }

  },2500)
}
module.exports = annotate;
