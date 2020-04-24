// maps incoming image to the canvas for scrollgraph program
module.exports = function handleImage(img, options) {
  var matcher;
  let createCanvas = require('./util/createCanvas.js'),
      util = require('./util/util.js')(options);
  var ctx = createCanvas('canvas', options);
  matcher = require('./setupMatcher.js')(options); // initialize matcher

  // initiate first frame
  compatibility.requestAnimationFrame(draw);

  // start by matching against first
  var isFirst = true,
      originX = (options.width / 2) - (options.srcWidth / 2),
      originY = (options.height / 2) - (options.srcHeight / 2),
      baseScale = 1,
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
        if (results.good_matches > options.goodMatchesMin && results.projected_corners) {

          var avgOffset = util.averageOffsets(results.projected_corners),
              imgPosX = originX - avgOffset.x + (options.srcWidth / 2),
              imgPosY = originY - avgOffset.y + (options.srcHeight / 2);

          var angleRadians = Math.atan2(results.projected_corners[1].y - results.projected_corners[0].y,
                                        results.projected_corners[1].x - results.projected_corners[0].x);
          if (options.scaling) var scale = (options.srcWidth) / Math.abs(results.projected_corners[1].x - results.projected_corners[0].x);

          ctx.save();
          ctx.translate(imgPosX + (options.srcWidth / 2), 
                        imgPosY + (options.srcHeight / 2));
          ctx.rotate(-angleRadians);

          // this just means we are displaying it larger. We actually should scale the point coordinates? The srcWidth?
          if (options.scaling) ctx.scale(baseScale * scale, baseScale * scale);
          ctx.translate(- (options.srcWidth / 2), 
                        - (options.srcHeight / 2));
          ctx.drawImage(img,
            0, 0,
            options.srcWidth,
            options.srcHeight);

          if (options.annotations) results.annotate(ctx, {x: imgPosX, y: imgPosY}); // draw match points
          ctx.restore();

          // new keyframe if 2x more good matches AND more than options.keyframeDistanceThreshold out from original image
          results.distFromKeyframe = Math.abs(results.projected_corners[0].x) + Math.abs(results.projected_corners[0].y);
          if (results.good_matches > options.goodMatchesMin * options.keyframeThreshold && results.distFromKeyframe > keyframeDistanceThreshold) {
            console.log('new keyframe!');
            matcher.train(img);

            if (options.annotations) {
              ctx.save();
              ctx.translate(
                (originX),
                (originY),
              );
           
              let render_pattern_shape = require('./jsfeat/renderPatternShape.js'); 
              // this draws the position of the original in the image. We may need to invert the matrix to place an image
//              render_pattern_shape(ctx, results.projected_corners); // draw a distorted frame
           
              ctx.restore();
              ctx.strokeStyle = "yellow";
              ctx.strokeRect(
                imgPosX,
                imgPosY,
                options.srcWidth,
                options.srcHeight);
            }


            // adjust ctx transform matrix and origin point
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
      compatibility.requestAnimationFrame(draw);

    } else { // try over again
      compatibility.requestAnimationFrame(draw);
    }
  }
  // pass out our matcher so it can be used to train(), match()
  return matcher;
}
