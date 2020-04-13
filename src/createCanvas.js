module.exports = function createCanvas(canvasOptions) {
  var _ctx, canvas, height, width;
  canvasOptions.canvasId = canvasOptions.canvasId || "canvas";
  canvas = document.getElementById(canvasOptions.canvasId);
  _ctx = canvas.getContext("2d");
  width = canvasOptions.width || 1000;
  height = canvasOptions.height || 1000;
  canvas.width = width;
  canvas.height = height;
  $(canvas).css('height', $(canvas).width() + 'px');
  return _ctx;
}
