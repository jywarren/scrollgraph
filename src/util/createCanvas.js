module.exports = function createCanvas(id, options) {
  var ctx, canvas, height, width;
  id = id || "canvas";
  canvas = document.getElementById(id);
  ctx = canvas.getContext("2d");
  width = options.width || 1000;
  height = options.height || 1000;
  canvas.width = width;
  canvas.height = height;
  $(canvas).css('height', $(canvas).width() + 'px');
  ctx.fillStyle = '#eee'; // background
  ctx.fillRect(0, 0, options.width, options.height);
  return ctx;
}
