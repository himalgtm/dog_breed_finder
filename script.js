const breedInput = document.getElementById('breedInput');
const breedList = document.getElementById('breeds');
const message = document.getElementById('message');
const imageContainer = document.getElementById('imageContainer');
const showImagesButton = document.getElementById('showImages');
let intervalId;

async function fetchBreeds() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        const breeds = Object.keys(data.message);
        breedList.innerHTML = breeds.map(breed => `<option value="${breed}">`).join('');
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
}

async function fetchDogImages() {
    clearInterval(intervalId);
    const breed = breedInput.value.toLowerCase();
    imageContainer.innerHTML = '';
    message.textContent = '';

    if (!breedList.innerHTML.includes(`value="${breed}"`)) {
        message.textContent = 'Oopsie!!! No such breed!';
        return;
    }

    async function loadImage() {
        try {
            const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
            const data = await response.json();
            imageContainer.innerHTML = `<img src="${data.message}" alt="${breed}">`;
        } catch (error) {
            console.error('Sorry! Error fetching dog images:', error);
        }
    }

    loadImage();
    intervalId = setInterval(loadImage, 5000);
}

showImagesButton.addEventListener('click', fetchDogImages);
fetchBreeds();
