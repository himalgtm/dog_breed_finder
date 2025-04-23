const breedInput = document.getElementById('breedInput');
const breedList = document.getElementById('breeds');
const message = document.getElementById('message');
const imageContainer = document.getElementById('imageContainer');
const showImagesButton = document.getElementById('showImages');
let intervalId = null;
let allBreeds = [];

async function fetchBreeds() {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await res.json();
    allBreeds = Object.keys(data.message);
    breedList.innerHTML = allBreeds.map(b => `<option value="${b}">`).join('');
  } catch (err) {
    message.textContent = 'Error loading breed list.';
  }
}

async function fetchDogImages() {
  clearInterval(intervalId);
  const breed = breedInput.value.toLowerCase().trim();
  imageContainer.innerHTML = '';
  message.textContent = '';

  if (!allBreeds.includes(breed)) {
    message.textContent = 'Oopsie!!! No such breed!';
    return;
  }

  const loader = document.createElement('p');
  loader.textContent = 'Loading...';
  imageContainer.appendChild(loader);

  async function loadImage() {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await response.json();
      imageContainer.innerHTML = `<img src="${data.message}" alt="${breed}">`;
    } catch {
      imageContainer.innerHTML = '';
      message.textContent = 'Failed to load image!';
    }
  }

  await loadImage();
  intervalId = setInterval(loadImage, 5000);
}

showImagesButton.addEventListener('click', fetchDogImages);
fetchBreeds();
