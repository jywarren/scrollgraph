// maps incoming image to the canvas for scrollgraph program
module.exports = function handleImage(img, options) {
  let createCanvas = require('./util/createCanvas.js'),
      setupMask = require('./setupMask.js'),
      drawImageWithMask = require('./drawImageWithMask.js'),
      filterFrame = require('./filterFrame.js'),
      filterKeyframe = require('./filterKeyframe.js'),
      util = require('./util/util.js')(options);
  var ctx = createCanvas('canvas', options),
      labelsCtx = createCanvas('labelsCanvas', options),
      matcher,
      mask,
      maskImg = new Image();

  labelsCtx.lineWidth = 4;

  return new Promise(function(resolve, reject) { 
    maskImg.onload = function maskLoaded() {
      if (options.vignette) mask = setupMask(options, maskImg); 
      matcher = require('./setupMatcher.js')(options); // initialize matcher
     
      // initiate first frame
      compatibility.requestAnimationFrame(draw);

      // pass out our matcher, merged with other useful return values, so it can be used to train(), match()
      resolve(Object.assign({
        imageHandler: handleImage
      }, matcher));
    }
    maskImg.src = 'images/circle.png';
 
    // start by matching against first
    var isFirst = true,
        originX = (options.width / 2) - (options.srcWidth / 2),
        originY = (options.height / 2) - (options.srcHeight / 2),
        baseScale = 1,
        lastFrame = Date.now(),
        lastKeyframeTime = Date.now(),
        lastKeyframe;
 
    function draw() {
      if (img instanceof Image || img instanceof HTMLVideoElement && img.readyState === img.HAVE_ENOUGH_DATA) {
 
        if (isFirst) {
          matcher.train(img);
          drawImageWithMask(img, originX, originY, ctx, mask, options);
          isFirst = false;
        } else {
 
          var results = matcher.match(img);

// add all these properties into the results object?
          var avgOffset = util.averageOffsets(results.projected_corners),
              imgPosX = originX - avgOffset.x + (options.srcWidth / 2),
              imgPosY = originY - avgOffset.y + (options.srcHeight / 2);

          var angleRadians = Math.atan2(results.projected_corners[1].y - results.projected_corners[0].y,
                                          results.projected_corners[1].x - results.projected_corners[0].x);

          if (filterFrame(results, options, lastFrame)) { 
            lastFrame = Date.now();

// move these into the filter? 
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
              drawImageWithMask(img, 0, 0, ctx, mask, options);
              ctx.globalCompositeOperation = 'source-over';
 
              if (options.annotations) results.annotate(ctx, {x: imgPosX, y: imgPosY}); // draw match points
              ctx.restore();

              if (filterKeyframe(results, options, lastKeyframeTime)) {
console.log('New! dist', results.distFromKeyframe, '/', options.keyframeDistanceThreshold, 'time', Date.now() - lastKeyframeTime)
                lastKeyframeTime = Date.now();
                matcher.train(img);

                // draw keyframe overlay circle
  
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
                drawImageWithMask(img, imgPosX, imgPosY, ctx, mask, options); // consider doing this only if it's non-blurry or something

                // draw overlay circle
                labelsCtx.clearRect(0, 0, options.width, options.height);
                if (lastKeyframe) {
                  labelsCtx.strokeStyle = "#888";
                  labelsCtx.beginPath();
                  labelsCtx.arc(lastKeyframe.x + options.srcWidth/2, lastKeyframe.y + options.srcHeight/2, options.srcWidth/2, 0, Math.PI*2, false);
                  labelsCtx.stroke();
                }
                labelsCtx.strokeStyle = "yellow";
                labelsCtx.beginPath();
                labelsCtx.arc(imgPosX + options.srcWidth/2, imgPosY + options.srcHeight/2, options.srcWidth/2, 0, Math.PI*2, false);
                labelsCtx.stroke();
  
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

                lastKeyframe = { x: imgPosX, y: imgPosY };
              } else if (lastKeyframe && Date.now() - lastKeyframeTime > 2000) {
                console.log('stuck');
                labelsCtx.strokeStyle = "orange";
                labelsCtx.beginPath();
                labelsCtx.arc(lastKeyframe.x + options.srcWidth/2, lastKeyframe.y + options.srcHeight/2, options.srcWidth/2, 0, Math.PI*2, false);
                labelsCtx.stroke();
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
}
