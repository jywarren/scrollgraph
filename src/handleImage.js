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
        console.log(results);

        if (results.good_matches > options.goodMatchesMin && results.projected_corners) {

          var avgOffset = util.averageOffsets(results.projected_corners),
              imgPosX = originX - avgOffset.x + (options.srcWidth / 2),
              imgPosY = originY - avgOffset.y + (options.srcHeight / 2);
          ctx.drawImage(img,
            imgPosX,
            imgPosY,
            options.srcWidth,
            options.srcHeight);

          if (options.annotations) results.annotate(ctx, {x: imgPosX, y: imgPosY}); // draw match points

          // new keyframe if 2x more good matches AND more than 50% out from original image
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
            // adjust offset to new origin
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
