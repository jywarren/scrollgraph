Scrollgraph = function Scrollgraph(options) {
  options = require('./defaults.js')(options);
  var setupWebcam = require('./setupWebcam.js');

  return new Promise(function(resolve, reject) { 

    var getOrientation = require('o9n').getOrientation;
    var orientation = getOrientation();
    if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
      console.log('portrait mode');
      // we need to swap the srcWidth and srcHeight
      var swap = options.srcWidth;
      options.srcWidth = options.srcHeight;
      options.srcHeight = swap;
      options = require('./defaults.js')(options); // re-run to re-calc canvasOffset
      $('#workingCanvas').width(options.srcWidth)
                         .height(options.srcHeight);
    } 

    resolve(setupWebcam(options, require('./handleImage.js')));

  });

}
