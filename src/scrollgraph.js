Scrollgraph = function Scrollgraph(options) {
  options = require('./defaults.js')(options);
  var setupWebcam = require('./setupWebcam.js');

  return new Promise(function(resolve, reject) { 

    resolve(setupWebcam(options, require('./handleImage.js')));

  });

}
