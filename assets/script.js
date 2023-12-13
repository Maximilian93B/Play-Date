// DOM Elements
const startButton = document.getElementById("startButton");
const inputForm = document.getElementById("activity-form");
const locationInput = document.getElementById("locationInput");
const submitButton = document.getElementById("submitButton");
const resultsContainer = document.getElementById("resultsContainer");
const activityDropdown = document.getElementById("dropdown");
// API Constants

const apiURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"; // Replace with your actual API URL
const apiKey = "AIzaSyDspXXMTdpqT9m3s1E7ZiZZgjE7t3sGzy8"; // Replace with your actual API Key



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
        const selectedActivity = activityDropdown.value;
        console.log("Selected Activity:", selectedActivity);
        console.log("Form Submitted with location:", location, selectedActivity);

        fetchGooglePlacesData(location, selectedActivity);
    });
});

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

// Function to map the selected activity to Google Places API type
function mapActivityToType(activity) {
    const types = {
        option1: 'park',
        option2: 'zoo',
        option3: 'amusement_park',
        option4: 'campground',
        option5: 'bowling_alley'
    };
    return types[activity] || 'park'; // Default to 'park' if no match
}


// Fetch Google Places Data
function fetchGooglePlacesData(location, selectedActivity) {
    const radius = 10000;
    const type = mapActivityToType(selectedActivity);
    const latitude = '46.0878';
    const longitude = '-64.7782'; 
    const buildApiUrl = `${apiURL}?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`
    
    fetch(buildApiUrl)
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


function initMap() {
  const myLatLng = { lat: 46.0878, lng: -64.7782 };
const map = new google.maps.Map(document.getElementById('googleMaps'),{
  center: myLatLng,
  zoom: 10

});
new google.maps.Marker({
  position: myLatLng,
  map,
  title: "Hello World!"
});

marker.setMap(map);
}


const latitude = 48.5554; 
const longitude = -87.4594; 
const numberOfPeople = 4; 
const activities = ['outdoor', 'swimming', 'trails', 'adventure', 'indoor', 'educational'];
//fetchGooglePlacesData(`${latitude},${longitude}`, activities);
