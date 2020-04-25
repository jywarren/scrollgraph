// maps incoming image to the canvas for scrollgraph program
module.exports = function handleImage(img, options) {
  var matcher;
  let createCanvas = require('./util/createCanvas.js'),
      util = require('./util/util.js')(options);
  var ctx = createCanvas('canvas', options);

  var mask = new Image();
  mask.onload = function() {
//    ctx.globalCompositeOperation = 'destination-in';
//    ctx.drawImage(mask, 0, 0, options.smallerSrcDimension, options.smallerSrcDimension);
//    ctx.globalCompositeOperation = 'source-in';

    matcher = require('./setupMatcher.js')(options); // initialize matcher
 
    // initiate first frame
    compatibility.requestAnimationFrame(draw);
  }
  mask.src = 'images/circle.png';

  // start by matching against first
  var isFirst = true,
      originX = (options.width / 2) - (options.srcWidth / 2),
      originY = (options.height / 2) - (options.srcHeight / 2),
      baseScale = 1
      lastFrame = Date.now(),
      lastKeyframe = Date.now(),
      keyframeDistanceThreshold = (options.srcWidth + options.srcHeight) / (1/options.keyframeDistanceThreshold);

  function draw() {
    if (img instanceof Image || img instanceof HTMLVideoElement && img.readyState === img.HAVE_ENOUGH_DATA) {

      if (isFirst) {
        matcher.train(img);
        ctx.drawImage(img, 
          originX,
          originY,
          options.srcWidth,
          options.srcHeight);
        isFirst = false;
      } else {

        var results = matcher.match(img);
        // be 1.25x more lax if it's been a while since the last match:
        if ((results.good_matches > options.goodMatchesMin || Date.now() - lastFrame > 500 && results.good_matches * 1.25 > options.goodMatchesMin) 
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
            ctx.drawImage(img, 0, 0,
              options.srcWidth,
              options.srcHeight);
 
            if (options.annotations) results.annotate(ctx, {x: imgPosX, y: imgPosY}); // draw match points
            ctx.restore();
 
            // new keyframe if:
            // 1. <keyframeThreshold> more good matches
            // 2. more than options.keyframeDistanceThreshold out from original image position
            // 3. more than 1000ms since last keyframe
            // 4. (later) we could say, if it's been 2 seconds since last keyframe, try a lower threshold?
            results.distFromKeyframe = Math.abs(results.projected_corners[0].x) + Math.abs(results.projected_corners[0].y);
            if (
              results.good_matches > options.goodMatchesMin * options.keyframeThreshold && 
              results.distFromKeyframe > keyframeDistanceThreshold && 
              Date.now() - lastKeyframe > 500
            ) {
              console.log('new keyframe!');
              lastKeyframe = Date.now();
              matcher.train(img);
 
              if (options.annotations) {
                ctx.save();
                ctx.translate(originX, originY);
                let render_pattern_shape = require('./jsfeat/renderPatternShape.js'); 
                // this draws the position of the original in the image. We may need to invert the matrix to place an image
////              render_pattern_shape(ctx, results.projected_corners); // draw a distorted frame
                ctx.restore();
             
                ctx.strokeStyle = "yellow";
                ctx.strokeRect(
                  imgPosX,
                  imgPosY,
                  options.srcWidth,
                  options.srcHeight);
              }
 
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
  // pass out our matcher so it can be used to train(), match()
  return matcher;
}
