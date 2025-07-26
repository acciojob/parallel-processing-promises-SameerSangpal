const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}

function downloadImages(imageList) {
  errorDiv.textContent = '';
  output.innerHTML = '';
  loadingDiv.style.display = 'block';

  const downloadPromises = imageList.map(image => downloadImage(image.url));

  Promise.all(downloadPromises)
    .then(images => {
      images.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    })
    .finally(() => {
      loadingDiv.style.display = 'none';
    });
}

btn.addEventListener("click", () => {
  downloadImages(images);
});
