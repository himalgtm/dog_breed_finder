const findDogBtn = document.getElementById('findDogBtn');
const dogImage = document.getElementById('dogImage');
const statusText = document.getElementById('status');

let imageInterval;

const breedMapping = {
    low: {
        solo: ["bulldog", "chow", "shih-tzu"],
        balanced: ["basset", "cavalier", "pug"],
        social: ["cavalier", "maltese", "pekingese"]
    },
    medium: {
        solo: ["shiba", "basenji", "whippet"],
        balanced: ["golden", "samoyed", "beagle"],
        social: ["border-collie", "cocker-spaniel", "dalmatian"]
    },
    high: {
        solo: ["malinois", "akita", "australian-shepherd"],
        balanced: ["labrador", "german-shepherd", "doberman"],
        social: ["husky", "jack-russell", "boxer"]
    }
};

function fetchDogImage(breed) {
    clearInterval(imageInterval);
    
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                dogImage.src = data.message;
                dogImage.style.display = 'block';
                statusText.innerText = `Your Spirit Dog is a ${breed.replace("-", " ").toUpperCase()}! 🐶`;

                imageInterval = setInterval(() => {
                    fetchDogImage(breed);
                }, 5000);
            } else {
                statusText.innerText = "Oops! No matching breed found.";
                dogImage.style.display = 'none';
            }
        })
        .catch(() => {
            statusText.innerText = "Error fetching dog images.";
        });
}

findDogBtn.addEventListener('click', () => {
    const energy = document.getElementById('energy').value;
    const social = document.getElementById('social').value;

    const breedList = breedMapping[energy][social];
    const randomBreed = breedList[Math.floor(Math.random() * breedList.length)];

    fetchDogImage(randomBreed);
});