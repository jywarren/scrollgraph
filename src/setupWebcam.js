module.exports = function setupWebcam(options, imageHandler) {
  var video = document.querySelector('video');
  // refactor this so that the image fetch layer is abstract, can swap
  navigator.mediaDevices.getUserMedia(options.camera)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
    };

    // turn off camera when done
    $(window).unload(function() {
      video.pause();
      video.src = null;
    });

    return imageHandler(video, options);
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}
