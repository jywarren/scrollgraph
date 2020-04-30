Scrollgraph = function Scrollgraph(options) {
  options = require('./defaults.js')(options);
  options.imageHandler = options.imageHandler || require('./handleImage.js'); // allow overriding
  var setupVideo = require('./setupVideo.js');

  return new Promise(function(resolve, reject) { 

    var getOrientation = require('o9n').getOrientation;
    var orientation = getOrientation();
    if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
      alert('portrait mode');
      // we need to swap the srcWidth and srcHeight
      var swap = options.srcWidth;
      options.srcWidth = options.srcHeight;
      options.srcHeight = swap;
      options = require('./defaults.js')(options); // re-run to re-calc canvasOffset
      $('#workingCanvas').width(options.srcWidth)
                         .height(options.srcHeight);
    } 

    setupVideo(options).then(function(videoApi) {

      // combine upstream returned objects with main external API
      resolve(Object.assign({
        setOption: setOption,
        getOption: getOption,
      }, videoApi));

    });

  });

  function setOption(key, value) {
    options[key] = value;
  }

  function getOption(key) {
    return options[key];
  }

}
