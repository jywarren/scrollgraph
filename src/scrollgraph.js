Scrollgraph = async function Scrollgraph(options) {
  let drawImage = require('./drawImage.js'),
      createCanvas = require('./createCanvas.js'),
      util = require('./util.js')(options),
      addImage = require('./addImage.js');

  // make this non-global later
  ctx = createCanvas(options);

  ctx.fillStyle = '#eee'; // background
  ctx.fillRect(0, 0, options.width, options.height);

  ctx.moveTo(-options.width/2, -options.height/2);

  options.canvasOffset = options.canvasOffset || {
    x: options.width/2 - options.srcWidth/2,
    y: options.height/2 - options.srcHeight/2
  }

  var img1 = await drawImage(ctx, options.path1, options.canvasOffset);
  if (options.debug) var img2 = await drawImage(ctx, options.path2, {x: 801, y: 0}, options.canvasOffset);

  // here, run this each time we get a new image
  addImage(options, options.path2, ctx);




  // for future usage: 

  // currently as imageData
  function getCanvasAsImage() {
    return ctx.getImageData(0, 0, options.width || 1000, options.height || 1000);
  }

  return {
    getCanvasAsImage: getCanvasAsImage
  }
}
