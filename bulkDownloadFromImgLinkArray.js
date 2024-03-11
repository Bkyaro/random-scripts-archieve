/**
 * @param {*} imageUrl : {category: string, images: string[]}
 * @param {*} categoryName : string
 */
function downloadImage(imageUrl, categoryName) {
  fetch(imageUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const timestamp = new Date().getTime();
      const filename = `${categoryName}_${timestamp}.png`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100); // 略微增加延迟时间以保证处理
    })
    .catch((error) => console.error("图片下载失败:", error));
}

function downloadImagesSequentially(imageData, index = 0) {
  if (
    !imageData ||
    !Array.isArray(imageData.images) ||
    imageData.images.length === 0
  ) {
    console.log("请输入包含图片链接的正确数据");
    return;
  }
  if (index >= imageData.images.length) {
    return; // 所有图片已处理完毕
  }

  const categoryName = imageData.category || "default";
  downloadImage(imageData.images[index], categoryName);
  setTimeout(() => {
    downloadImagesSequentially(imageData, index + 1); // 递归调用以下载下一张图片
  }, 500); // 增加间隔时间以避免并发下载
}
