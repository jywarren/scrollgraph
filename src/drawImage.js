module.exports = function drawImage(ctx, src, offset) {
  offset = offset || {x: 0, y: 0};
  return new Promise((resolve, reject) => {
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
  })
}
