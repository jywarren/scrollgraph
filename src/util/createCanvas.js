module.exports = function createCanvas(id, options) {
  var ctx, canvas, height, width;
  id = id || "canvas";
  canvas = document.getElementById(id);
  ctx = canvas.getContext("2d");
  width = options.width || 1000;
  height = options.height || 1000;
  canvas.width = width;
  canvas.height = height;
  // scale the canvas to fit on the page, but don't sacrifice true pixel resolution
  var scale;
  if (window.innerWidth < window.innerHeight) {
    $(canvas).css('height', $(canvas).width() + 'px');
    scale = (window.innerWidth / $(canvas).width());
  } else {
    $(canvas).css('width', $(canvas).height() + 'px');
    scale = (window.innerHeight / $(canvas).height());
  }
  $(canvas).css('position', 'absolute');
  $(canvas).css('transform-origin', 'top left');
  $(canvas).css('transform', 'scale(' + scale + ')');
  ctx.fillStyle = '#000'; // background
  ctx.fillRect(0, 0, options.width, options.height);
  return ctx;
}
