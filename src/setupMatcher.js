"use strict";
module.exports = function setupMatcher(video, ctx, options) {

options.num_train_levels = options.num_train_levels || 4;

/* ATTEMPT TO DO THIS EXTERNALLY 
var video = document.getElementById('webcam');

try {
  var attempts = 0;
  var readyListener = function(event) {
    findVideoSize();
  };
  var findVideoSize = function() {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      video.removeEventListener('loadeddata', readyListener);
      onDimensionsReady(video.videoWidth, video.videoHeight);
    } else {
      if (attempts < 10) {
        attempts++;
        setTimeout(findVideoSize, 200);
      } else {
        onDimensionsReady(640, 480);
      }
    }
  };
  var onDimensionsReady = function(width, height) {
    demo_app(width, height);
    compatibility.requestAnimationFrame(draw);
  };

  video.addEventListener('loadeddata', readyListener);

  compatibility.getUserMedia({video: true}, function(stream) {
    video.srcObject = stream;
    setTimeout(function() {
      video.play();
    }, 500);
  }, function (error) {
    console.log('WebRTC not available.');
  });
} catch (error) {
  console.log('Something goes wrong...');
}
*/

initialize(options.srcWidth, options.srcHeight);
compatibility.requestAnimationFrame(match);

$(window).unload(function() {
  video.pause();
  video.src=null;
});

var canvasWidth, canvasHeight;
var img_u8, img_u8_smooth, screen_corners, num_corners, screen_descriptors;
var pattern_corners, pattern_descriptors, pattern_preview;
var matches, homo3x3, match_mask;
var shape_pts;

// externalizing submodules:
let match_pattern = require('./jsfeat/matchPattern.js');
let find_transform = require('./jsfeat/findTransform.js');
let ic_angle = require('./jsfeat/icAngle.js');
let detect_keypoints = require('./jsfeat/detectKeypoints.js');
let train_pattern = require('./jsfeat/trainPattern.js')(
  img_u8,
  pattern_corners,
  pattern_preview,
  pattern_descriptors,
  pattern_corners,
  options);

function initialize(videoWidth, videoHeight) {
  canvasWidth  = canvas.width;
  canvasHeight = canvas.height;

  ctx.fillStyle = "rgb(0,255,0)";
  ctx.strokeStyle = "rgb(0,255,0)";

  // our point match structure
  var match_t = (function () {
    function match_t(screen_idx, pattern_lev, pattern_idx, distance) {
      if (typeof screen_idx === "undefined") { screen_idx=0; }
      if (typeof pattern_lev === "undefined") { pattern_lev=0; }
      if (typeof pattern_idx === "undefined") { pattern_idx=0; }
      if (typeof distance === "undefined") { distance=0; }
 
      this.screen_idx = screen_idx;
      this.pattern_lev = pattern_lev;
      this.pattern_idx = pattern_idx;
      this.distance = distance;
    }
    return match_t;
  })();

  img_u8 = new jsfeat.matrix_t(640, 480, jsfeat.U8_t | jsfeat.C1_t);
  // after blur
  img_u8_smooth = new jsfeat.matrix_t(640, 480, jsfeat.U8_t | jsfeat.C1_t);
  // we wll limit to 500 strongest points
  screen_descriptors = new jsfeat.matrix_t(32, 500, jsfeat.U8_t | jsfeat.C1_t);
  pattern_descriptors = [];

  screen_corners = [];
  pattern_corners = [];
  matches = [];

  var i = 640*480;
  while (--i >= 0) {
    screen_corners[i] = new jsfeat.keypoint_t(0,0,0,0,-1);
    matches[i] = new match_t();
  }

  // transform matrix
  homo3x3 = new jsfeat.matrix_t(3,3,jsfeat.F32C1_t);
  match_mask = new jsfeat.matrix_t(500,1,jsfeat.U8C1_t);

  options.blur_size = options.blur_size || 5;
  options.lap_thres = options.lap_thres || 30;
  options.eigen_thres = options.eigen_thres || 25;
  options.match_threshold = options.match_threshold || 48;
}

function train(img) {
  // later, do something with img
  pattern_preview = train_pattern().pattern_preview;
}

// requires: img_u8, img_u8_smooth, options, screen_corners, num_corners, screen_descriptors, pattern_preview, matches, homo3x3
function match() {
  // queue next frame
  compatibility.requestAnimationFrame(match);

// BEGIN section to externalize into fetchImage
  if (video.readyState === video.HAVE_ENOUGH_DATA) {

    ctx.drawImage(video, 0, 0, 640, 480); // draw incoming image to canvas
    var imageData = ctx.getImageData(0, 0, 640, 480); // get it as imageData
// END section

    // start processing new image
    jsfeat.imgproc.grayscale(imageData.data, 640, 480, img_u8);
    jsfeat.imgproc.gaussian_blur(img_u8, img_u8_smooth, options.blur_size|0);

    jsfeat.yape06.laplacian_threshold = options.lap_thres|0;
    jsfeat.yape06.min_eigen_value_threshold = options.eigen_thres|0;

    num_corners = detect_keypoints(img_u8_smooth, screen_corners, 500);

    jsfeat.orb.describe(img_u8_smooth, screen_corners, num_corners, screen_descriptors);

    var num_matches = 0;
    var good_matches = 0;
    if (pattern_preview) {

      // match the points:
      num_matches = match_pattern(screen_descriptors, pattern_descriptors, matches, options);

      // find the transform:
      good_matches = find_transform(matches, num_matches, screen_corners, pattern_corners, homo3x3, match_mask);

      // get the projected pattern corners
      shape_pts = require('./jsfeat/tCorners.js')(homo3x3.data, pattern_preview.cols*2, pattern_preview.rows*2);
console.log('shape_pts', shape_pts);
    }

    // ctx.putImageData(imageData, 0, 0); // to draw on the canvas
    if (options.annotations) require('./jsfeat/annotateImage.js')(ctx,
      imageData,
      matches,
      num_matches,
      num_corners,
      good_matches,
      screen_corners,
      pattern_corners,
      shape_pts,
      pattern_preview,
      match_mask);

    return {
      matches,
      shape_pts
    }
  }
}

return {
  train: train,
  match: match
}

}
