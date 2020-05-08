module.exports = function setupMask(options, maskImg) {
  let createCanvas = require('./util/createCanvas.js');
  var maskCanvas = document.createElement('CANVAS');
  maskCanvas.id = 'maskCanvas';
  maskCanvas.style = 'display:none;';
  document.body.appendChild(maskCanvas);
  var maskCtx = createCanvas('maskCanvas', { width: options.srcWidth, height: options.srcHeight });
  maskCtx.fillStyle = "black";
  maskCtx.fillRect(0, 0, options.srcWidth, options.srcHeight);
  maskCtx.globalCompositeOperation = 'destination-in';
  maskCtx.drawImage(maskImg, 0, 0, options.smallerSrcDimension, options.smallerSrcDimension);
  maskCtx.globalCompositeOperation = 'source-in';
  var maskOffset = { x: 0, y: 0 };
  if (options.srcWidth > options.srcHeight) {
    maskOffset.x = -(options.srcWidth - options.srcHeight) / 2;
  } else {
    maskOffset.y = -(options.srcHeight - options.srcWidth) / 2;
  }
  return {
    ctx: maskCtx,
    canvas: maskCanvas,
    offset: maskOffset
  }
}
