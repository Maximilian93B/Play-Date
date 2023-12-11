// DOM Elements
const startButton = document.getElementById("startButton");
const inputForm = document.getElementById("activity-form");
const locationInput = document.getElementById("locationInput");
const submitButton = document.getElementById("submitButton");
const resultsContainer = document.getElementById("resultsContainer");

// API Constants
const apiURL = "add your API URL here"; // Replace with your actual API URL
const apiKey = "add your API Key here"; // Replace with your actual API Key

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
    startButton.addEventListener("click", function() {
        console.log("Get Started Button Clicked");
        inputForm.scrollIntoView({ behavior: "smooth" });
    });

    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        console.log("Submit Button Clicked");

        const location = locationInput.value;
        const selectedActivities = getSelectedActivities();
        console.log("Selected Activities:", selectedActivities);
        console.log("Form Submitted with location:", location);

        fetchGooglePlacesData(location, selectedActivities);
    });
});

// Function to get selected activities from checkboxes
function getSelectedActivities() {
    const checkboxes = document.querySelectorAll('input[name="favoriteActivity"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Function to render results from Google APIs into results container
function renderResults(places) {
    resultsContainer.innerHTML = ""; 
    places.forEach(element => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("col-md-4");
        resultElement.innerHTML = `
            <div class="result">
                <h3>${element.name}</h3>
                <p>${element.address}</p>
            </div>
        `;
        resultsContainer.appendChild(resultElement);
    });
}

// Fetch Google Places Data
function fetchGooglePlacesData(location, selectedActivities) {
    const radius = 4000;
    const types = {
        outdoor: 'park',
        swimming: 'swimming_pool',
        trails: 'hiking',
        adventure: 'rock_climbing',
        indoor: 'arts_crafts',
        educational: 'puzzles'
    };

    const selectedTypes = selectedActivities.map(activity => types[activity]).join('|');
    const apiUrl = `${apiURL}?location=${location}&radius=${radius}&types=${selectedTypes}&key=${apiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => responseData(data))
    .catch(error => console.error('Error fetching data:', error));
}

// Handle Response Data
function responseData(data) {
    if (data?.results?.length > 0) {
        console.log('Places Found:');
        data.results.forEach(place => {
            console.log('Place Name:', place.name);
            console.log('Place Address:', place.vicinity);
        });
        renderResults(data.results);
    } else {
        console.log('No results found');
    }
}

// Example usage
const latitude = 48.5554; // Replace with your latitude
const longitude = -87.4594; // Replace with your longitude
const numberOfPeople = 4; // Adjust as needed
const activities = ['outdoor', 'swimming', 'trails', 'adventure', 'indoor', 'educational'];
fetchGooglePlacesData(`${latitude},${longitude}`, activities);
