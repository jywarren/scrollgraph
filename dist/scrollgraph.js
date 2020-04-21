(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function createCanvas(id, options) {
  var ctx, canvas, height, width;
  id = id || "canvas";
  canvas = document.getElementById(id);
  ctx = canvas.getContext("2d");
  width = options.width || 1000;
  height = options.height || 1000;
  canvas.width = width;
  canvas.height = height;
  $(canvas).css('height', $(canvas).width() + 'px');
  ctx.fillStyle = '#eee'; // background
  ctx.fillRect(0, 0, options.width, options.height);
  return ctx;
}

},{}],2:[function(require,module,exports){
function annotate(points, ctx, offset) {
  setTimeout(function() {

    ctx.font = '14px sans';
    ctx.globalAlpha = 1;
 
    points.forEach(markPoints);

    function markPoints(p, i) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'red';
 
      // first circle adjusted
      ctx.arc(p.x1 + offset.x, p.y1 + offset.y, 6, 0, Math.PI*2);
      ctx.stroke();
 
      // label
      //ctx.fillText(i+'/'+parseInt(p.confidence.c1+p.confidence.c2), p.x1, p.y1);
      //ctx.fill();
 
      ctx.restore();
    }

    // this was for displaying 2 images side by side, 800px offset
    function sidebyside(p, i) {
      ctx.save();
      ctx.beginPath();
 
      // first circle adjusted
      ctx.arc(p.x1, p.y1, 4, 0, Math.PI*2);
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
 
      ctx.moveTo(800 + p.x2, p.y2);
      ctx.lineTo(p.x1, p.y1);
      ctx.stroke();
 
      // second circle
      ctx.strokeStyle = 'blue';
      ctx.beginPath();
      ctx.arc(800 + p.x2, p.y2, 4, 0, Math.PI*2);
      ctx.stroke();
 
      // label
      ctx.beginPath();
      ctx.fillText(i+'/'+parseInt(p.confidence.c1+p.confidence.c2), p.x1, p.y1);
      ctx.fill();
 
      ctx.restore();
    }

  },2500)
}
module.exports = annotate;

},{}],3:[function(require,module,exports){
module.exports = function defaults(options) {
  options.goodMatchesMin = options.goodMatchesMin || 8;
  options.annotations = options.annotations || true;
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

},{}],4:[function(require,module,exports){
module.exports = function annotate_image(ctx, imageData, matches, num_matches, num_corners, good_matches, screen_corners, pattern_corners, shape_pts, pattern_preview, match_mask) {
  let render_pattern_shape = require('./renderPatternShape.js'); 
  let render_corners = require('./renderCorners.js'); 
  let render_matches = require('./renderMatches.js'); 
  let render_mono_image = require('./renderMonoImage.js'); 

  var data_u32 = new Uint32Array(imageData.data.buffer); // new image structure
 
  ctx.fillStyle = "rgb(0,255,0)";
  ctx.strokeStyle = "rgb(0,255,0)";

  if (pattern_preview) render_mono_image(pattern_preview.data, data_u32, pattern_preview.cols, pattern_preview.rows, 640);

  // mark found points in imageData to be put onto canvas
  render_corners(screen_corners, num_corners, data_u32, 640);

  ctx.putImageData(imageData, 0, 0); // write annotations and preview image back onto canvas

  if (num_matches) {
    // connect points with lines:
    render_matches(ctx, matches, num_matches, screen_corners, pattern_corners, match_mask);
    if (good_matches > 8)
      render_pattern_shape(ctx, shape_pts); // draw a distorted frame
  }
}

},{"./renderCorners.js":10,"./renderMatches.js":11,"./renderMonoImage.js":12,"./renderPatternShape.js":13}],5:[function(require,module,exports){
module.exports = function detect_keypoints(img, corners, max_allowed) {
  let ic_angle = require('./icAngle.js');

  // detect features
  var count = jsfeat.yape06.detect(img, corners, 17);

  // sort by score and reduce the count if needed
  if (count > max_allowed) {
    jsfeat.math.qsort(corners, 0, count-1, function(a,b){return (b.score<a.score);});
    count = max_allowed;
  }

  // calculate dominant orientation for each keypoint
  for (var i = 0; i < count; ++i) {
    corners[i].angle = ic_angle(img, corners[i].x, corners[i].y);
  }

  return count;
}

},{"./icAngle.js":7}],6:[function(require,module,exports){
// estimate homography transform between matched points
module.exports = function find_transform(matches, count, screen_corners, pattern_corners, homo3x3, match_mask) {
  // motion kernel
  var mm_kernel = new jsfeat.motion_model.homography2d();
  // ransac params
  var num_model_points = 4;
  var reproj_threshold = 3;
  var ransac_param = new jsfeat.ransac_params_t(num_model_points,
                                                reproj_threshold, 0.5, 0.99);

  var pattern_xy = [];
  var screen_xy = [];

  // construct correspondences
  for (var i = 0; i < count; ++i) {
    var m = matches[i];
    var s_kp = screen_corners[m.screen_idx];
    var p_kp = pattern_corners[m.pattern_lev][m.pattern_idx];
    pattern_xy[i] = {"x":p_kp.x, "y":p_kp.y};
    screen_xy[i] =  {"x":s_kp.x, "y":s_kp.y};
  }

  // estimate motion
  var ok = false;
  ok = jsfeat.motion_estimator.ransac(ransac_param, mm_kernel,
                                      pattern_xy, screen_xy, count, homo3x3, match_mask, 1000);

  // extract good matches and re-estimate
  var good_cnt = 0;
  if (ok) {
    for (var i=0; i < count; ++i) {
      if (match_mask.data[i]) {
        pattern_xy[good_cnt].x = pattern_xy[i].x;
        pattern_xy[good_cnt].y = pattern_xy[i].y;
        screen_xy[good_cnt].x = screen_xy[i].x;
        screen_xy[good_cnt].y = screen_xy[i].y;
        good_cnt++;
      }
    }
    // run kernel directly with inliers only
    mm_kernel.run(pattern_xy, screen_xy, homo3x3, good_cnt);
  } else {
    jsfeat.matmath.identity_3x3(homo3x3, 1.0);
  }

  return good_cnt;
}

},{}],7:[function(require,module,exports){
// central difference using image moments to find dominant orientation
var u_max = new Int32Array([15,15,15,15,14,14,14,13,13,12,11,10,9,8,6,3,0]);
module.exports = function ic_angle(img, px, py) {
  var half_k = 15; // half patch size
  var m_01 = 0, m_10 = 0;
  var src=img.data, step=img.cols;
  var u=0, v=0, center_off=(py*step + px)|0;
  var v_sum=0,d=0,val_plus=0,val_minus=0;

  // Treat the center line differently, v=0
  for (u = -half_k; u <= half_k; ++u)
    m_10 += u * src[center_off+u];

  // Go line by line in the circular patch
  for (v = 1; v <= half_k; ++v) {
    // Proceed over the two lines
    v_sum = 0;
    d = u_max[v];
    for (u = -d; u <= d; ++u) {
      val_plus = src[center_off+u+v*step];
      val_minus = src[center_off+u-v*step];
      v_sum += (val_plus - val_minus);
      m_10 += u * (val_plus + val_minus);
    }
    m_01 += v * v_sum;
  }

  return Math.atan2(m_01, m_10);
}

},{}],8:[function(require,module,exports){
// naive brute-force matching.
// each on screen point is compared to all pattern points
// to find the closest match
module.exports = function match_pattern(screen_descriptors, pattern_descriptors, matches, options) {
  var q_cnt = screen_descriptors.rows;
  var query_du8 = screen_descriptors.data;
  var query_u32 = screen_descriptors.buffer.i32; // cast to integer buffer
  var qd_off = 0;
  var qidx=0,lev=0,pidx=0,k=0;
  var num_matches = 0;
  let popcnt32 = require('./popcnt32.js');

  for (qidx = 0; qidx < q_cnt; ++qidx) {
    var best_dist = 256;
    var best_dist2 = 256;
    var best_idx = -1;
    var best_lev = -1;

    for (lev = 0; lev < options.num_train_levels; ++lev) {
      var lev_descr = pattern_descriptors[lev];
      var ld_cnt = lev_descr.rows;
      var ld_i32 = lev_descr.buffer.i32; // cast to integer buffer
      var ld_off = 0;

      for (pidx = 0; pidx < ld_cnt; ++pidx) {

        var curr_d = 0;
        // our descriptor is 32 bytes so we have 8 Integers
        for (k=0; k < 8; ++k) {
          curr_d += popcnt32( query_u32[qd_off+k]^ld_i32[ld_off+k] );
        }

        if (curr_d < best_dist) {
          best_dist2 = best_dist;
          best_dist = curr_d;
          best_lev = lev;
          best_idx = pidx;
        } else if(curr_d < best_dist2) {
          best_dist2 = curr_d;
        }

        ld_off += 8; // next descriptor
      }
    }

    // filter out by some threshold
    if (best_dist < options.match_threshold) {
      matches[num_matches].screen_idx = qidx;
      matches[num_matches].pattern_lev = best_lev;
      matches[num_matches].pattern_idx = best_idx;
      num_matches++;
    }
    //

    /* filter using the ratio between 2 closest matches
    if(best_dist < 0.8*best_dist2) {
      matches[num_matches].screen_idx = qidx;
      matches[num_matches].pattern_lev = best_lev;
      matches[num_matches].pattern_idx = best_idx;
      num_matches++;
    }
    */

    qd_off += 8; // next query descriptor
  }

  return num_matches;
}

},{"./popcnt32.js":9}],9:[function(require,module,exports){
// non zero bits count
module.exports = function popcnt32(n) {
  n -= ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4))& 0xF0F0F0F)* 0x1010101) >> 24;
}

},{}],10:[function(require,module,exports){
// draws tiny +s on the canvas where there are corners
module.exports = function render_corners(corners, count, img, step) {
  var pix = (0xff << 24) | (0x00 << 16) | (0xff << 8) | 0x00;
  for (var i=0; i < count; ++i) {
    var x = corners[i].x;
    var y = corners[i].y;
    var off = (x + y * step);
    img[off] = pix;
    img[off-1] = pix;
    img[off+1] = pix;
    img[off-step] = pix;
    img[off+step] = pix;
  }
}

},{}],11:[function(require,module,exports){
module.exports = function render_matches(ctx, matches, count, screen_corners, pattern_corners, match_mask) {
  for(var i = 0; i < count; ++i) {
    var m = matches[i];
    var s_kp = screen_corners[m.screen_idx];
    var p_kp = pattern_corners[m.pattern_lev][m.pattern_idx];
    if(match_mask.data[i]) {
      ctx.strokeStyle = "rgb(0,255,0)";
    } else {
      ctx.strokeStyle = "rgb(255,0,0)";
    }
    ctx.beginPath();
    ctx.moveTo(s_kp.x,s_kp.y);
    ctx.lineTo(p_kp.x*0.5, p_kp.y*0.5); // our preview is downscaled
    ctx.lineWidth=1;
    ctx.stroke();
  }
}

},{}],12:[function(require,module,exports){
module.exports = function render_mono_image(src, dst, sw, sh, dw) {
  var alpha = (0xff << 24);
  for(var i = 0; i < sh; ++i) {
    for(var j = 0; j < sw; ++j) {
      var pix = src[i*sw+j];
      dst[i*dw+j] = alpha | (pix << 16) | (pix << 8) | pix;
    }
  }
}

},{}],13:[function(require,module,exports){
module.exports = function render_pattern_shape(ctx, shape_pts) {
  ctx.strokeStyle = "rgb(0,255,0)";
  ctx.beginPath();

  ctx.moveTo(shape_pts[0].x,shape_pts[0].y);
  ctx.lineTo(shape_pts[1].x,shape_pts[1].y);
  ctx.lineTo(shape_pts[2].x,shape_pts[2].y);
  ctx.lineTo(shape_pts[3].x,shape_pts[3].y);
  ctx.lineTo(shape_pts[0].x,shape_pts[0].y);

  ctx.lineWidth=4;
  ctx.stroke();
}

},{}],14:[function(require,module,exports){
// project/transform rectangle corners with 3x3 Matrix
module.exports = function tCorners(M, w, h) {
  var pt = [ {'x':0,'y':0}, {'x':w,'y':0}, {'x':w,'y':h}, {'x':0,'y':h} ];
  var z=0.0, i=0, px=0.0, py=0.0;

  for (; i < 4; ++i) {
    px = M[0]*pt[i].x + M[1]*pt[i].y + M[2];
    py = M[3]*pt[i].x + M[4]*pt[i].y + M[5];
    z = M[6]*pt[i].x + M[7]*pt[i].y + M[8];
    pt[i].x = px/z;
    pt[i].y = py/z;
  }

  return pt;
}

},{}],15:[function(require,module,exports){
// refactor this to accept an image/video?
module.exports = function setupTrainPattern(img_u8, pattern_corners, pattern_preview, pattern_descriptors, pattern_corners, ctx, options) {
  // exposed closure
  return function train_pattern(newImg) {
    let detect_keypoints = require('./detectKeypoints.js');

    var lev=0, i=0;
    var sc = 1.0;
    var max_pattern_size = 512;
    var max_per_level = 300;
    var sc_inc = Math.sqrt(2.0); // magic number ;)
    var lev0_img = new jsfeat.matrix_t(img_u8.cols, img_u8.rows, jsfeat.U8_t | jsfeat.C1_t);
    var lev_img = new jsfeat.matrix_t(img_u8.cols, img_u8.rows, jsfeat.U8_t | jsfeat.C1_t);
    var new_width = 0, new_height = 0;
    var lev_corners, lev_descr;
    var corners_num=0;
 
    var sc0 = Math.min(max_pattern_size/img_u8.cols, max_pattern_size/img_u8.rows);
    new_width = (img_u8.cols*sc0)|0;
    new_height = (img_u8.rows*sc0)|0;

    // insert greyscale so we can place new image data
    ctx.drawImage(newImg, 0, 0, 640, 480); // draw incoming image to canvas
    var imageData = ctx.getImageData(0, 0, 640, 480); // get it as imageData
    // start processing new image
    jsfeat.imgproc.grayscale(imageData.data, 640, 480, img_u8);
 
    jsfeat.imgproc.resample(img_u8, lev0_img, new_width, new_height);
 
    // prepare preview
    pattern_preview = new jsfeat.matrix_t(new_width>>1, new_height>>1, jsfeat.U8_t | jsfeat.C1_t);
    jsfeat.imgproc.pyrdown(lev0_img, pattern_preview);
 
    for (lev=0; lev < options.num_train_levels; ++lev) {
      pattern_corners[lev] = [];
      lev_corners = pattern_corners[lev];
 
      // preallocate corners array
      i = (new_width*new_height) >> lev;
      while (--i >= 0) {
        lev_corners[i] = new jsfeat.keypoint_t(0,0,0,0,-1);
      }
 
      pattern_descriptors[lev] = new jsfeat.matrix_t(32, max_per_level, jsfeat.U8_t | jsfeat.C1_t);
    }
 
    // do the first level
    lev_corners = pattern_corners[0];
    lev_descr = pattern_descriptors[0];
 
    // begin analyzing image
    jsfeat.imgproc.gaussian_blur(lev0_img, lev_img, options.blur_size|0); // this is more robust
    corners_num = detect_keypoints(lev_img, lev_corners, max_per_level);
    jsfeat.orb.describe(lev_img, lev_corners, corners_num, lev_descr);
 
    console.log("train " + lev_img.cols + "x" + lev_img.rows + " points: " + corners_num);
 
    sc /= sc_inc;
 
    // lets do multiple scale levels
    // we can use Canvas context draw method for faster resize
    // but its nice to demonstrate that you can do everything with jsfeat
    for (lev = 1; lev < options.num_train_levels; ++lev) {
      lev_corners = pattern_corners[lev];
      lev_descr = pattern_descriptors[lev];
 
      new_width = (lev0_img.cols*sc)|0;
      new_height = (lev0_img.rows*sc)|0;
 
      jsfeat.imgproc.resample(lev0_img, lev_img, new_width, new_height);
      jsfeat.imgproc.gaussian_blur(lev_img, lev_img, options.blur_size|0);
      corners_num = detect_keypoints(lev_img, lev_corners, max_per_level);
      jsfeat.orb.describe(lev_img, lev_corners, corners_num, lev_descr);
 
      // fix the coordinates due to scale level
      for (i = 0; i < corners_num; ++i) {
        lev_corners[i].x *= 1./sc;
        lev_corners[i].y *= 1./sc;
      }
 
      console.log("train " + lev_img.cols + "x" + lev_img.rows + " points: " + corners_num);
 
      sc /= sc_inc;
    }
    return {
      pattern_preview: pattern_preview
    }
  }
};

},{"./detectKeypoints.js":5}],16:[function(require,module,exports){
Scrollgraph = function Scrollgraph(options) {
  var matcher,
      video = document.querySelector('video');
  let createCanvas = require('./createCanvas.js'),
      util = require('./util.js')(options);
  var ctx = createCanvas('canvas', options);

  options = require('./defaults.js')(options);

  return new Promise(function(resolve, reject) { 

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

      matcher = require('./setupMatcher.js')(options); // initialize matcher and pass in the video element

      // initiate first frame
      compatibility.requestAnimationFrame(draw);

      // start by matching against first
      var isFirst = true,
          offsetX = (options.width / 2) - (options.srcWidth / 2),
          offsetY = (options.height / 2) - (options.srcHeight / 2);

      function draw() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {

          if (isFirst) {
            matcher.train(video);
            ctx.drawImage(video, 
              offsetX,
              offsetY,
              options.srcWidth,
              options.srcHeight);
            isFirst = false;
          } else {

            console.log('matching...');
            var results = matcher.match(video);

            if (results.good_matches > options.goodMatchesMin && results.projectedCorners) {
              console.log('Good match!', results.good_matches);
 
              var avOffset = util.averageOffsets(results.projectedCorners);
              ctx.drawImage(video,
                offsetX - avOffset.x + (options.srcWidth / 2),
                offsetY - avOffset.y + (options.srcHeight / 2),
                options.srcWidth,
                options.srcHeight);

              // replace pattern image with newly matched image
              matcher.train(video);
 
            } else {
              console.log('no good matches');
            }
          }
          compatibility.requestAnimationFrame(draw);

        } else { // try over again
          compatibility.requestAnimationFrame(draw);
        }
      }

      // pass out the API so people can use it externally
      resolve(matcher);
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

  });
}

},{"./createCanvas.js":1,"./defaults.js":3,"./setupMatcher.js":17,"./util.js":18}],17:[function(require,module,exports){
"use strict";
module.exports = function setupMatcher(options) {

  let createCanvas = require('./createCanvas.js');
  var ctx = createCanvas('workingCanvas', options);

  options.num_train_levels = options.num_train_levels || 4;
  var canvasWidth, canvasHeight;
  var img_u8, img_u8_smooth, screen_corners, num_corners, screen_descriptors;
  var pattern_corners, pattern_descriptors, pattern_preview;
  var matches, homo3x3, match_mask;
  var projectedCorners;

  // externalizing submodules:
  let match_pattern = require('./jsfeat/matchPattern.js');
  let find_transform = require('./jsfeat/findTransform.js');
  let ic_angle = require('./jsfeat/icAngle.js');
  let detect_keypoints = require('./jsfeat/detectKeypoints.js');

  initialize(options.srcWidth, options.srcHeight);

  function initialize(videoWidth, videoHeight) {
    canvasWidth  = canvas.width;
    canvasHeight = canvas.height;
 
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
 
    options.blur_size = options.blur_size || 5;
    options.lap_thres = options.lap_thres || 30;
    options.eigen_thres = options.eigen_thres || 25;
    options.match_threshold = options.match_threshold || 48;
  }

  function train(img) {
    let train_pattern = require('./jsfeat/trainPattern.js')(
      img_u8,
      pattern_corners,
      pattern_preview,
      pattern_descriptors,
      pattern_corners,
      ctx,
      options);
    pattern_preview = train_pattern(img).pattern_preview;
  }

  // requires: img_u8, img_u8_smooth, options, screen_corners, num_corners, screen_descriptors, pattern_preview, matches, homo3x3
  function match(img) {

    ctx.drawImage(img, 0, 0, options.srcWidth, options.srcHeight); // draw incoming image to canvas
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
      projectedCorners = require('./jsfeat/tCorners.js')(homo3x3.data, pattern_preview.cols*2, pattern_preview.rows*2);
 
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
      projectedCorners,
      pattern_preview,
      match_mask);
 
    return {
      good_matches: good_matches,
      num_matches: num_matches,
      num_corners: num_corners,
      projectedCorners: projectedCorners
    }
  }

  return {
    train: train,
    match: match
  }

}

},{"./createCanvas.js":1,"./jsfeat/annotateImage.js":4,"./jsfeat/detectKeypoints.js":5,"./jsfeat/findTransform.js":6,"./jsfeat/icAngle.js":7,"./jsfeat/matchPattern.js":8,"./jsfeat/tCorners.js":14,"./jsfeat/trainPattern.js":15}],18:[function(require,module,exports){
module.exports = function util(options) {

  // https://www.pentarem.com/blog/how-to-use-settimeout-with-async-await-in-javascript/
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // adjust points from pattern-matching 512x512 pixel space (with its oddities and ambiguities)
  // to the input image pixel space(s)
  function correctPoints(points, width) {
    var ratio = width / 512; // ratio of source image to pattern-matching cavas
    var ratio2 = ratio / 1.25; // mysterious 1.25 factor off on 2nd image
    points.forEach(function(p, i) {
      p.x1 *= ratio;
      p.y1 *= ratio;
      p.x2 *= ratio2;
      p.y2 *= ratio2;
    });
    return points;
  }

  function averageOffsets(offsets) {
    var x = 0, y = 0;
    offsets.forEach(function(offset) {
      x += offset.x;
      y += offset.y;
    });    
    return {
      x: x / offsets.length,
      y: y / offsets.length
    }
  }

  function sumOffsets(oA, oB) {
    return {
      x: oA.x + oB.x,
      y: oA.y + oB.y
    }
  }

  function sortByConfidence(points) {
    return points.sort(function(a, b) {
      if (a.confidence.c1 + a.confidence.c2 < b.confidence.c1 + b.confidence.c2) return 1;
      else return -1;
    });
  }

  function getOffset(points) {
    return {
      x: points.x1 - points.x2,
      y: points.y1 - points.y2,
    };
  }

  // in degrees; alternatively var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  // not doing this yet as we're only doing translation
  function findAngle(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;    
  }

  return {
    delay: delay,
    averageOffsets: averageOffsets,
    correctPoints: correctPoints,
    sumOffsets: sumOffsets,
    sortByConfidence: sortByConfidence,
    getOffset: getOffset,
    findAngle: findAngle
  }
}

},{}]},{},[1,3,16,17,18,2,4,5,6,7,8,9,10,11,12,13,14,15]);
