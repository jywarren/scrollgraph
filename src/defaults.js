module.exports = function defaults(options) {
  options.goodMatchesMin = options.goodMatchesMin || 8;
  options.keyframeThreshold = options.keyframeThreshold || 2;
  options.keyframeDistanceThreshold = options.keyframeDistanceThreshold || 1/3;
  if (typeof options.trainingMargin !== "number") options.trainingMargin = 0.1;
  options.annotations = options.annotations === true || false;
  options.vignette = options.vignette === true || false;
  options.source = options.source || "webcam";
  options.videoSelector = options.videoSelector || "#video";
  options.srcWidth = options.srcWidth || 800;
  options.srcHeight = options.srcHeight || 600; 
  options.flipBitX = options.flipBitX || 1; 
  options.flipBitY = options.flipBitY || 1; 
  // the center of the canvas, offset by -1/2 the image dimensions
  options.canvasOffset = options.canvasOffset || {
    x: options.width/2 - options.srcWidth/2,
    y: options.height/2 - options.srcHeight/2
  }
  options.smallerSrcDimension = options.srcWidth;
  if (options.srcHeight < options.srcWidth) options.smallerSrcDimension = options.srcHeight;
  return options;
}
