module.exports = function drawImageWithMask(img, x, y, ctx, mask, options) {
  if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.save();
  if (options.vignette) {
    if (options.flipBitX === -1) ctx.translate(options.smallerSrcDimension, 0);
    if (options.flipBitY === -1) ctx.translate(0, options.smallerSrcDimension);
    if (options.flipBitX !== 1 || options.flipBitY !== 1) ctx.scale(options.flipBitX, options.flipBitY);
    // apply circular vignette mask
    mask.ctx.drawImage(img, mask.offset.x, mask.offset.y,
      options.srcWidth,
      options.srcHeight);

    ctx.drawImage(mask.canvas, x, y,
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
