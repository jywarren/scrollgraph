module.exports = function videoToImage(video) {
  const canvas = document.createElement('CANVAS');
  const ctx = canvas.getContext("2d");
  let width = video.videoWidth;
  let height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  $(canvas).css('display', 'none');
  ctx.drawImage(video, 0, 0, width, height);
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.src = canvas.toDataURL();
  });
}
