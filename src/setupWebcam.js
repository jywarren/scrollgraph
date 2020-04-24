module.exports = function setupWebcam(options, imageHandler) {
  options.camera = options.camera || { audio: false, video: { 
    width: options.srcWidth,
    height: options.srcHeight, 
    facingMode: "environment"
  } }; 
  var video = document.querySelector('video');
  $(video).width(options.srcWidth)
          .height(options.srcHeight);

  navigator.mediaDevices.getUserMedia(options.camera)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();

      return imageHandler(video, options);
    };

    // turn off camera when done
    $(window).unload(function() {
      video.pause();
      video.src = null;
    });
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}
