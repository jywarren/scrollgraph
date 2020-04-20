module.exports = function drawImage(ctx, src, offset) {
  offset = offset || {x: 0, y: 0};
  return new Promise((resolve, reject) => {
    // if it's a video, just pass it along, skipping onLoad
    if (src instanceof String) {
      let img = new Image()
      img.onload = () => {
        ctx.globalAlpha = 0.5;
        ctx.drawImage(
          img,
          0, 0,
          img.width,
          img.height,
          offset.x,
          offset.y,
          img.width,
          img.height
        );
        resolve(img)
      }
      img.src = src;
    } else {
      ctx.globalAlpha = 0.5;
      ctx.drawImage(
        src,
        0, 0,
        src.videoWidth,
        src.videoHeight,
        offset.x,
        offset.y,
        src.videoWidth,
        src.videoHeight
      );
      resolve(src)
    }
  });
}
