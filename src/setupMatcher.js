"use strict";
module.exports = function setupMatcher(options) {

  let jsfeat = require('jsfeat');
  let createCanvas = require('./util/createCanvas.js');
  var ctx = createCanvas('workingCanvas', options);
  var work = require('webworkify');
  var trainerWorker = work(require('./jsfeat/trainPattern.js'));

  options.num_train_levels = options.num_train_levels || 4;
  var canvasWidth, canvasHeight;
  var img_u8, img_u8_smooth, screen_corners, num_corners, screen_descriptors;
  var pattern_corners, pattern_descriptors, pattern_preview;
  var matches, homo3x3, match_mask;
  var projected_corners;

  // externalizing submodules:
  let match_pattern = require('./jsfeat/matchPattern.js');
  let find_transform = require('./jsfeat/findTransform.js');
  let ic_angle = require('./jsfeat/icAngle.js');
  let detect_keypoints = require('./jsfeat/detectKeypoints.js');

  initialize(options.srcWidth, options.srcHeight);

  function initialize(videoWidth, videoHeight) {
    canvasWidth  = canvas.width;
    canvasHeight = canvas.height;

    options.blur_size = options.blur_size || 5;
    options.lap_thres = options.lap_thres || 30;
    options.eigen_thres = options.eigen_thres || 25;
    options.match_threshold = options.match_threshold || 48;
 
    // our point match structure
    var match_t = require('./jsfeat/matchStructure.js')();

    img_u8 = new jsfeat.matrix_t(options.srcWidth, options.srcHeight, jsfeat.U8_t | jsfeat.C1_t);
    // after blur
    img_u8_smooth = new jsfeat.matrix_t(options.srcWidth, options.srcHeight, jsfeat.U8_t | jsfeat.C1_t);
    // we wll limit to 500 strongest points
    screen_descriptors = new jsfeat.matrix_t(32, 500, jsfeat.U8_t | jsfeat.C1_t);
    pattern_descriptors = [];

    screen_corners = [];
    pattern_corners = [];
    matches = [];

    var i = options.srcWidth * options.srcHeight;
    while (--i >= 0) {
      screen_corners[i] = new jsfeat.keypoint_t(0,0,0,0,-1);
      matches[i] = new match_t();
    }

    // transform matrix
    homo3x3 = new jsfeat.matrix_t(3,3,jsfeat.F32C1_t);
    match_mask = new jsfeat.matrix_t(500,1,jsfeat.U8C1_t);
  }

  function isTrained() {
    return typeof pattern_corners !== "undefined" && pattern_corners.length > 0;
  }

  // Here we try to train the matcher within a web worker, to move it off of the main thread and reduce lag.
  // That means all values passed into the worker must be cloned and so no longer related to work in this thread.
  function train(img, callback) {

    trainerWorker.addEventListener('message', function (response) {
      // copy back the new values:
      pattern_preview = response.data.pattern_preview;
      pattern_descriptors = response.data.pattern_descriptors;
      pattern_corners = response.data.pattern_corners;
      callback(response.data);
    });

    // trainingMargin is the width of the margin we discard when training a pattern; this improves matching for some reason.
    // It is a proportion (from 0 to 1) of the image dimensions. 
    var xOffset = options.trainingMargin * options.srcWidth;
    var yOffset = options.trainingMargin * options.srcHeight;

    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.save();
    if (options.flipBitX === -1) ctx.translate(options.srcWidth, 0);
    if (options.flipBitY === -1) ctx.translate(0, options.srcHeight);
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.scale(options.flipBitX, options.flipBitY);
      // draw the image too big, letting margins hang off edges
      ctx.drawImage(img,
        0, 0,
        options.srcWidth, options.srcHeight,
        -xOffset, -yOffset,
        options.srcWidth + xOffset, options.srcHeight + yOffset); // draw incoming image to canvas
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.restore();

    // we won't be able to send a canvas object but we can send the data:
    var imageData = ctx.getImageData(0, 0, options.srcWidth, options.srcHeight); // get it as imageData

    // pack up a slimmer and flat (no functions) options object
    var trainerOptions = {
      blur_size: options.blur_size,
      num_train_levels: options.num_train_levels,
      srcWidth: options.srcWidth,
      srcHeight: options.srcHeight,
      trainingMargin: options.trainingMargin
    }
 
    trainerWorker.postMessage({
      img_u8_buffer: img_u8.buffer,
      pattern_preview: pattern_preview,
      pattern_descriptors: pattern_descriptors,
      pattern_corners: pattern_corners,
      imageData: imageData.data,
      options: trainerOptions
    }); // send the worker a message
  }

  function match(img, offset) {

    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.save();
    if (options.flipBitX === -1) ctx.translate(options.srcWidth, 0);
    if (options.flipBitY === -1) ctx.translate(0, options.srcHeight);
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.scale(options.flipBitX, options.flipBitY);
    ctx.drawImage(img, 0, 0, options.srcWidth, options.srcHeight); // draw incoming image to canvas
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.restore();
    var imageData = ctx.getImageData(0, 0, options.srcWidth, options.srcHeight); // get it as imageData
 
    // start processing new image
    jsfeat.imgproc.grayscale(imageData.data, options.srcWidth, options.srcHeight, img_u8);
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
      projected_corners = require('./jsfeat/tCorners.js')(homo3x3.data, pattern_preview.cols*2, pattern_preview.rows*2);
 
    }

    // TODO: re-confirm what we actually need to pass into here
    function annotate(displayCtx, offset) {
      require('./jsfeat/annotateImage.js')(
        displayCtx,
        imageData,
        matches,
        num_matches,
        num_corners,
        good_matches,
        screen_corners,
        pattern_corners,
        projected_corners,
        pattern_preview,
        match_mask,
        offset,
        options);
    }
 
    return {
      good_matches: good_matches,
      matches: matches,
      num_matches: num_matches,
      num_corners: num_corners,
      projected_corners: projected_corners,
      annotate: annotate
    }
  }

  return {
    train: train,
    isTrained: isTrained,
    match: match
  }

}
