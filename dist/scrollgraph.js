(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function getOrientation() {
  if (!window) return undefined;
  var screen = window.screen;
  var orientation;

  // W3C spec implementation
  if (
    typeof window.ScreenOrientation === 'function' &&
    screen.orientation instanceof ScreenOrientation &&
    typeof screen.orientation.addEventListener == 'function' &&
    screen.orientation.onchange === null &&
    typeof screen.orientation.type === 'string'
  ) {
    orientation = screen.orientation;
  } else {
    orientation = createOrientation();
  }

  return orientation;
}

module.exports = {
  orientation: getOrientation(),
  getOrientation: getOrientation,
  install: function install () {
    var screen = window.screen;
    if (typeof window.ScreenOrientation === 'function' &&
      screen.orientation instanceof ScreenOrientation) {
      return screen.orientation;
    }
    window.screen.orientation = orientation;
    return orientation;
  }
};

function createOrientation () {
  var orientationMap = {
    '90': 'landscape-primary',
    '-90': 'landscape-secondary',
    '0': 'portrait-primary',
    '180': 'portrait-secondary'
  };

  function ScreenOrientation() {}
  var or = new ScreenOrientation();

  var found = findDelegate(or);

  ScreenOrientation.prototype.addEventListener = delegate('addEventListener', found.delegate, found.event);
  ScreenOrientation.prototype.dispatchEvent = delegate('dispatchEvent', found.delegate, found.event);
  ScreenOrientation.prototype.removeEventListener = delegate('removeEventListener', found.delegate, found.event);
  ScreenOrientation.prototype.lock = getLock();
  ScreenOrientation.prototype.unlock = getUnlock();


  Object.defineProperties(or, {
    onchange: {
      get: function () {
        return found.delegate['on' + found.event] || null;
      },
      set: function (cb) {
        found.delegate['on' + found.event] = wrapCallback(cb, or);
      }
    },
    type: {
      get: function () {
        var screen = window.screen;
        return screen.msOrientation || screen.mozOrientation ||
          orientationMap[window.orientation + ''] ||
          (getMql().matches ? 'landscape-primary' : 'portrait-primary');
      }
    },
    angle: {
      value: 0
    }
  });

  return or;
}

function delegate (fnName, delegateContext, eventName) {
  var that = this;
  return function delegated () {
    var args = Array.prototype.slice.call(arguments);
    var actualEvent = args[0].type ? args[0].type : args[0];
    if (actualEvent !== 'change') {
      return;
    }
    if (args[0].type) {
      args[0] = getOrientationChangeEvent(eventName, args[0]);
    } else {
      args[0] = eventName;
    }
    var wrapped = wrapCallback(args[1], that);
    if (fnName === 'addEventListener') {
      addTrackedListener(args[1], wrapped);
    }
    if (fnName === 'removeEventListener') {
      removeTrackedListener(args[1]);
    }
    args[1] = wrapped;
    return delegateContext[fnName].apply(delegateContext, args);
  };
}

var trackedListeners = [];
var originalListeners = [];

function addTrackedListener(original, wrapped) {
  var idx = originalListeners.indexOf(original);
  if (idx > -1) {
    trackedListeners[idx] = wrapped;
  } else {
    originalListeners.push(original);
    trackedListeners.push(wrapped);
  }
}

function removeTrackedListener(original) {
  var idx = originalListeners.indexOf(original);
  if (idx > -1) {
    originalListeners.splice(idx, 1);
    trackedListeners.splice(idx, 1);
  }
}

function wrapCallback(cb, orientation) {
  var idx = originalListeners.indexOf(cb);
  if (idx > -1) {
    return trackedListeners[idx];
  }
  return function wrapped (evt) {
    if (evt.target !== orientation) {
      defineValue(evt, 'target', orientation);
    }
    if (evt.currentTarget !== orientation) {
      defineValue(evt, 'currentTarget', orientation);
    }
    if (evt.type !== 'change') {
      defineValue(evt, 'type', 'change');
    }
    cb(evt);
  };
}

function getLock () {
  var err = 'lockOrientation() is not available on this device.';
  var delegateFn;
  var screen = window.screen;
  if (typeof screen.msLockOrientation == 'function') {
    delegateFn = screen.msLockOrientation.bind(screen);
  } else if (typeof screen.mozLockOrientation == 'function') {
    delegateFn = screen.mozLockOrientation.bind(screen);
  } else {
    delegateFn = function () { return false; };
  }

  return function lock(lockType) {
    const Promise = window.Promise;
    if (delegateFn(lockType)) {
      return Promise.resolve(lockType);
    } else {
      return Promise.reject(new Error(err));
    }
  };
}

function getUnlock () {
  var screen = window.screen;
  return screen.orientation && screen.orientation.unlock.bind(screen.orientation) ||
    screen.msUnlockOrientation && screen.msUnlockOrientation.bind(screen) ||
    screen.mozUnlockOrientation && screen.mozUnlockOrientation.bind(screen) ||
    function unlock () { return; };
}

function findDelegate (orientation) {
  var events = ['orientationchange', 'mozorientationchange', 'msorientationchange'];

  for (var i = 0; i < events.length; i++) {
    if (screen['on' + events[i]] === null) {
      return {
        delegate: screen,
        event: events[i]
      };
    }
  }

  if (typeof window.onorientationchange != 'undefined') {
    return {
      delegate: window,
      event: 'orientationchange'
    };
  }

  return {
    delegate: createOwnDelegate(orientation),
    event: 'change'
  };
}

function getOrientationChangeEvent (name, props) {
  var orientationChangeEvt;

  try {
    orientationChangeEvt = new Event(name, props);
  } catch (e) {
    orientationChangeEvt = { type: 'change' };
  }
  return orientationChangeEvt;
}

function createOwnDelegate(orientation) {
  var ownDelegate = Object.create({
    addEventListener: function addEventListener(evt, cb) {
      if (!this.listeners[evt]) {
        this.listeners[evt] = [];
      }
      if (this.listeners[evt].indexOf(cb) === -1) {
        this.listeners[evt].push(cb);
      }
    },
    dispatchEvent: function dispatchEvent(evt) {
      if (!this.listeners[evt.type]) {
        return;
      }
      this.listeners[evt.type].forEach(function(fn) {
        fn(evt);
      });
      if (typeof orientation.onchange == 'function') {
        orientation.onchange(evt);
      }
    },
    removeEventListener: function removeEventListener(evt, cb) {
      if (!this.listeners[evt]) {
        return;
      }
      var idx = this.listeners[evt].indexOf(cb);
      if (idx > -1) {
        this.listeners[evt].splice(idx, 1);
      }
    },
  });

  ownDelegate.listeners = {};

  var mql = getMql();

  if (mql && typeof mql.matches === 'boolean') {
    mql.addListener(function() {
      ownDelegate.dispatchEvent(getOrientationChangeEvent('change'));
    });
  }

  return ownDelegate;
}

function getMql () {
  if (typeof window.matchMedia != 'function') {
    return {};
  }
  return window.matchMedia('(orientation: landscape)');
}

function defineValue(obj, key, val) {
  Object.defineProperty(obj, key, {
    value: val
  });
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
  options.keyframeThreshold = options.keyframeThreshold || 2;
  options.keyframeDistanceThreshold = options.keyframeDistanceThreshold || 1/3;
  options.annotations = options.annotations === true || false;
  options.vignette = options.vignette === true || false;
  options.source = options.source || "webcam";
  options.videoSelector = options.videoSelector || "#video";
  options.srcWidth = options.srcWidth || 800;
  options.srcHeight = options.srcHeight || 600; 
  options.flipBitX = options.flipBitX || 1; 
  options.flipBitY = options.flipBitY || 1; 
  // the center of the canvas, offset by -1/2 the image dimensions
  options.canvasOffset = options.canvasOffset || {
    x: options.width/2 - options.srcWidth/2,
    y: options.height/2 - options.srcHeight/2
  }
  options.smallerSrcDimension = options.srcWidth;
  if (options.srcHeight < options.srcWidth) options.smallerSrcDimension = options.srcHeight;
  return options;
}

},{}],4:[function(require,module,exports){
// maps incoming image to the canvas for scrollgraph program
module.exports = function handleImage(img, options) {
  var matcher;
  let createCanvas = require('./util/createCanvas.js'),
      util = require('./util/util.js')(options);
  var ctx = createCanvas('canvas', options);

  var maskCtx,
      maskCanvas,
      mask = new Image(),
      maskOffset = { x: 0, y: 0 };

  if (options.srcWidth > options.srcHeight) {
    maskOffset.x = -(options.srcWidth - options.srcHeight) / 2;
  } else {
    maskOffset.y = -(options.srcHeight - options.srcWidth) / 2;
  }

  return new Promise(function(resolve, reject) { 
    mask.onload = function maskLoaded() {
      if (options.vignette) {
        maskCanvas = document.createElement('CANVAS');
        maskCanvas.id = 'maskCanvas';
        maskCanvas.style = 'display:none;';
        document.body.appendChild(maskCanvas);
        maskCtx = createCanvas('maskCanvas', { width: options.srcWidth, height: options.srcHeight });
        maskCtx.fillStyle = "black";
        maskCtx.fillRect(0, 0, options.srcWidth, options.srcHeight);
        maskCtx.globalCompositeOperation = 'destination-in';
        maskCtx.drawImage(mask, 0, 0, options.smallerSrcDimension, options.smallerSrcDimension);
        maskCtx.globalCompositeOperation = 'source-in';
      }
     
      matcher = require('./setupMatcher.js')(options); // initialize matcher
     
      // initiate first frame
      compatibility.requestAnimationFrame(draw);

      // pass out our matcher, merged with other useful return values, so it can be used to train(), match()
      resolve(Object.assign({
        imageHandler: handleImage
      }, matcher));
    }
    mask.src = 'images/circle.png';
 
    // start by matching against first
    var isFirst = true,
        originX = (options.width / 2) - (options.srcWidth / 2),
        originY = (options.height / 2) - (options.srcHeight / 2),
        baseScale = 1
        lastFrame = Date.now(),
        lastKeyframe = Date.now();
 
    function draw() {
      if (img instanceof Image || img instanceof HTMLVideoElement && img.readyState === img.HAVE_ENOUGH_DATA) {
 
        if (isFirst) {
          matcher.train(img);
          drawImage(img, originX, originY);
          isFirst = false;
        } else {
 
          var results = matcher.match(img);

          // filterFrame()
          // be 1.25x more lax if it's been a while since the last match:
          if ((results.good_matches > options.goodMatchesMin ||
               Date.now() - lastFrame > 500 && 
               results.good_matches * 1.25 > options.goodMatchesMin) 
             && results.projected_corners) {
 
            lastFrame = Date.now();
            var avgOffset = util.averageOffsets(results.projected_corners),
                imgPosX = originX - avgOffset.x + (options.srcWidth / 2),
                imgPosY = originY - avgOffset.y + (options.srcHeight / 2);
 
            var angleRadians = Math.atan2(results.projected_corners[1].y - results.projected_corners[0].y,
                                          results.projected_corners[1].x - results.projected_corners[0].x);
 
            // don't allow jumps of
            // 1. > 1.5x the image width/height
            // 2. > 0.25 radians (~15deg)
            if (avgOffset.x + avgOffset.y < (options.srcWidth / 2 + options.srcHeight / 2) * 1.5
                && angleRadians < 0.25) {
 
              if (options.scaling) var scale = (options.srcWidth) / Math.abs(results.projected_corners[1].x - results.projected_corners[0].x);
  
              ctx.save();
              ctx.translate(imgPosX + (options.srcWidth / 2), 
                            imgPosY + (options.srcHeight / 2));
              ctx.rotate(-angleRadians);
  
              // this just means we are displaying it larger. We actually should scale the point coordinates? The srcWidth?
              if (options.scaling) ctx.scale(baseScale * scale, baseScale * scale);
              ctx.translate(- (options.srcWidth / 2), 
                            - (options.srcHeight / 2));

              // place non-keyframes behind canvas
              ctx.globalCompositeOperation = 'destination-over';
              drawImage(img, 0, 0);
              ctx.globalCompositeOperation = 'source-over';
 
              if (options.annotations) results.annotate(ctx, {x: imgPosX, y: imgPosY}); // draw match points
              ctx.restore();

              // filterKeyframe()  
              // new keyframe if:
              // 1. <keyframeThreshold> more good matches
              // 2. more than options.keyframeDistanceThreshold out from original image position
              // 3. more than 1000ms since last keyframe
              // 4. over 100 points available to match from
              results.distFromKeyframe = parseInt(Math.abs(results.projected_corners[0].x) + Math.abs(results.projected_corners[0].y));
              if (
                results.good_matches > options.goodMatchesMin * options.keyframeThreshold && 
                results.distFromKeyframe > options.keyframeDistanceThreshold && 
                Date.now() - lastKeyframe > 500 &&
                results.num_corners > 100
              ) {
console.log('New! dist', results.distFromKeyframe, '/', options.keyframeDistanceThreshold, 'time', Date.now() - lastKeyframe)
                lastKeyframe = Date.now();
                matcher.train(img);
  
                if (options.annotations) {
                  ctx.save();
                  ctx.translate(originX, originY);
                  let render_pattern_shape = require('./jsfeat/renderPatternShape.js'); 
                  // this draws the position of the original in the image. We may need to invert the matrix to place an image
//////              render_pattern_shape(ctx, results.projected_corners); // draw a distorted frame
                  ctx.restore();
               
                  ctx.strokeStyle = "yellow";
                  ctx.strokeRect(
                    imgPosX,
                    imgPosY,
                    options.srcWidth,
                    options.srcHeight);
                }
                // draw again on top since it's a keyframe
                drawImage(img, imgPosX, imgPosY); // consider doing this only if it's non-blurry or something
  
                // adjust ctx transform matrix and origin point to new keyframe
                if (options.scaling) baseScale = scale; // save base scale
                ctx.translate(imgPosX + (options.srcWidth / 2), 
                              imgPosY + (options.srcHeight / 2));
                ctx.rotate(-angleRadians);
                ctx.translate(-imgPosX - (options.srcWidth / 2), 
                              -imgPosY - (options.srcHeight / 2));
                // adjust to new origin
                originX += -avgOffset.x + (options.srcWidth / 2);
                originY += -avgOffset.y + (options.srcHeight / 2);
              }
            }
 
          }
        }
        compatibility.requestAnimationFrame(draw);
 
      } else { // try over again
        compatibility.requestAnimationFrame(draw);
      }
    }
  });

  function drawImage(img, x, y) {
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.save();
    if (options.vignette) {
      if (options.flipBitX === -1) ctx.translate(options.smallerSrcDimension, 0);
      if (options.flipBitY === -1) ctx.translate(0, options.smallerSrcDimension);
      if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.scale(options.flipBitX, options.flipBitY);
      // apply circular vignette mask
      maskCtx.drawImage(img, maskOffset.x, maskOffset.y,
        options.srcWidth,
        options.srcHeight);
  
      ctx.drawImage(maskCanvas, x, y,
        options.srcWidth,
        options.srcHeight);
    } else {
      if (options.flipBitX === -1) ctx.translate(options.srcWidth, 0);
      if (options.flipBitY === -1) ctx.translate(0, options.srcHeight);
      if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.scale(options.flipBitX, options.flipBitY);
      ctx.drawImage(img, x, y,
        options.srcWidth,
        options.srcHeight);
    }
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.restore();
  }
}

},{"./jsfeat/renderPatternShape.js":14,"./setupMatcher.js":18,"./util/createCanvas.js":20,"./util/util.js":21}],5:[function(require,module,exports){
module.exports = function annotate_image(ctx, imageData, matches, num_matches, num_corners, good_matches, screen_corners, pattern_corners, shape_pts, pattern_preview, match_mask, offset, options) {
  offset = offset || {x: 0, y:0};
  let render_corners = require('./renderCorners.js'); 
  let render_matches = require('./renderMatches.js'); 
  let render_pattern_shape = require('./renderPatternShape.js'); 

  var data_u32 = new Uint32Array(imageData.data.buffer); // new image structure
 
  ctx.fillStyle = "rgb(0,255,0)";
  ctx.strokeStyle = "rgb(0,255,0)";

  // mark found points in imageData to be put onto canvas
  render_corners(screen_corners, num_corners, data_u32, options.srcWidth);

  // putImageData doesn't respect ctx.translate!!!
  var workingCanvas = document.getElementById('workingCanvas');
  var workingCtx = workingCanvas.getContext('2d');
  workingCtx.putImageData(imageData, 0, 0); // write annotations and preview image back onto canvas
  // transfer to a working canvas so we can rotate it
  ctx.drawImage(workingCanvas, 0, 0, options.srcWidth, options.srcHeight,
                               0, 0, options.srcWidth, options.srcHeight);

//  if (num_matches) {
    // connect points with lines:
//    render_matches(ctx, matches, num_matches, screen_corners, pattern_corners, match_mask);
//    if (good_matches > 8)
//      render_pattern_shape(ctx, shape_pts); // draw a distorted frame
//  }
}

},{"./renderCorners.js":12,"./renderMatches.js":13,"./renderPatternShape.js":14}],6:[function(require,module,exports){
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

},{"./icAngle.js":8}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./popcnt32.js":11}],10:[function(require,module,exports){
module.exports = (function () {
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
})

},{}],11:[function(require,module,exports){
// non zero bits count
module.exports = function popcnt32(n) {
  n -= ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4))& 0xF0F0F0F)* 0x1010101) >> 24;
}

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

    // trainingMargin is the width of the margin we discard when training a pattern; this improves matching for some reason.
    // It is a proportion (from 0 to 1) of the image dimensions. 
    options.trainingMargin = options.trainingMargin || 0.1;
    var xOffset = options.trainingMargin * options.srcWidth;
    var yOffset = options.trainingMargin * options.srcHeight;

    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.save();
    if (options.flipBitX === -1) ctx.translate(options.srcWidth, 0);
    if (options.flipBitY === -1) ctx.translate(0, options.srcHeight);
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.scale(options.flipBitX, options.flipBitY);
      // draw the image too big, letting margins hang off edges
      ctx.drawImage(newImg,
        0, 0,
        options.srcWidth, options.srcHeight,
        -xOffset, -yOffset,
        options.srcWidth + xOffset, options.srcHeight + yOffset); // draw incoming image to canvas
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.restore();

    var imageData = ctx.getImageData(0, 0, options.srcWidth, options.srcHeight); // get it as imageData

    // start processing new image
    jsfeat.imgproc.grayscale(imageData.data, options.srcWidth, options.srcHeight, img_u8);
 
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
    
    // fix the coordinates due to zoom-in on point finding
    for (i = 0; i < lev_corners.length; ++i) {
      lev_corners[i].x *= 1 / (1 + (options.trainingMargin * 2));
      lev_corners[i].y *= 1 / (1 + (options.trainingMargin * 2));
      lev_corners[i].x += xOffset;
      lev_corners[i].y += yOffset;
    }
 
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
        // fix the coordinates due to zoom-in on point finding
        lev_corners[i].x *= 1 / (1 + (options.trainingMargin * 2));
        lev_corners[i].y *= 1 / (1 + (options.trainingMargin * 2));
        lev_corners[i].x += xOffset;
        lev_corners[i].y += yOffset;
        lev_corners[i].x += xOffset;
        lev_corners[i].y += yOffset;
      }
 
      console.log("train " + lev_img.cols + "x" + lev_img.rows + " points: " + corners_num);
 
      sc /= sc_inc;
    }

    return {
      pattern_preview: pattern_preview
    }
  }
};

},{"./detectKeypoints.js":6}],17:[function(require,module,exports){
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

},{"./defaults.js":3,"./handleImage.js":4,"./setupVideo.js":19,"o9n":1}],18:[function(require,module,exports){
"use strict";
module.exports = function setupMatcher(options) {

  let createCanvas = require('./util/createCanvas.js');
  var ctx = createCanvas('workingCanvas', options);

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
    match: match
  }

}

},{"./jsfeat/annotateImage.js":5,"./jsfeat/detectKeypoints.js":6,"./jsfeat/findTransform.js":7,"./jsfeat/icAngle.js":8,"./jsfeat/matchPattern.js":9,"./jsfeat/matchStructure.js":10,"./jsfeat/tCorners.js":15,"./jsfeat/trainPattern.js":16,"./util/createCanvas.js":20}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
module.exports = function createCanvas(id, options) {
  var ctx, canvas, height, width;
  id = id || "canvas";
  canvas = document.getElementById(id);
  ctx = canvas.getContext("2d");
  width = options.width || 1000;
  height = options.height || 1000;
  canvas.width = width;
  canvas.height = height;
  // scale the canvas to fit on the page, but don't sacrifice true pixel resolution
  var scale;
  if (window.innerWidth < window.innerHeight) {
    $(canvas).css('height', $(canvas).width() + 'px');
    scale = (window.innerWidth / $(canvas).width());
  } else {
    $(canvas).css('width', $(canvas).height() + 'px');
    scale = (window.innerHeight / $(canvas).height());
  }
  $(canvas).css('position', 'absolute');
  $(canvas).css('transform-origin', 'top left');
  $(canvas).css('transform', 'scale(' + scale + ')');
  return ctx;
}

},{}],21:[function(require,module,exports){
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

},{}]},{},[3,4,17,18,19,2,5,6,7,8,9,10,11,12,13,14,15,16,20,21]);
