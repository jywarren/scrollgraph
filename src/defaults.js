module.exports = function defaults(options) {
  options.goodMatchesMin = options.goodMatchesMin || 8;
  options.keyframeThreshold = options.keyframeThreshold || 2;
  options.keyframeDistanceThreshold = options.keyframeDistanceThreshold || 1/3;
  options.annotations = options.annotations === true || false;
  options.srcWidth = options.srcWidth || 800;
  options.srcHeight = options.srcHeight || 600; 
  options.canvasOffset = options.canvasOffset || {
    x: options.width/2 - options.srcWidth/2,
    y: options.height/2 - options.srcHeight/2
  }
  // Prefer camera resolution nearest to 1280x720.
  options.camera = options.camera || { audio: false, video: { 
    width: options.srcWidth,
    height: options.srcHeight, 
    facingMode: "environment"
  } }; 
  return options;
}
