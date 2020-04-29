module.exports = function setupWebcam(options) {
  options.camera = options.camera || { audio: false, video: { 
    width: options.srcWidth,
    height: options.srcHeight, 
    facingMode: "environment"
  } }; 
  return new Promise(async function(resolve, reject) { 
    var video = document.querySelector(options.videoSelector);
    $(video).width(options.srcWidth)
            .height(options.srcHeight);

    if (options.source === "webcam") connectWebcam(video, options, resolve);
    else if (options.source === "video") connectVideo(video, options, resolve);

  });
}

function connectVideo(video, options, resolve) {
  video.play();
  resolve(options.imageHandler(video, options));
}

function connectWebcam(video, options, resolve) {
  navigator.mediaDevices.getUserMedia(options.camera)
  .then(function(mediaStream) {
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
      resolve(options.imageHandler(video, options));
    };

    // turn off camera when done
    $(window).unload(function() {
      video.pause();
      video.src = null;
    });
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}
