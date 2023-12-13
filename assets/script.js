// DOM Elements
const startButton = document.getElementById("startButton");
const inputForm = document.getElementById("activity-form");
const locationInput = document.getElementById("locationInput");
const submitButton = document.getElementById("submitButton");
const resultsContainer = document.getElementById("resultsContainer");
const activityDropdown = document.getElementById("dropdown");

// API Constants

let map;

const apiURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"; // Replace with your actual API URL
const apiKey = "AIzaSyDspXXMTdpqT9m3s1E7ZiZZgjE7t3sGzy8"; // Replace with your actual API Key


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

        fetchGooglePlacesData(location, selectedActivity).then(() => {
           
            showCards(); // Call showCards after fetchGooglePlacesData completes
        });
    });
});


function showCards() {
    const cards = document.querySelectorAll("card");
    cards.forEach(card => {
        card.style.display = "flex"; // Or "block", depending on your layout
    });
}


function renderResults(places) {
    resultsContainer.innerHTML = ""; 
    places.forEach(place => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");

        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${place.name}</h5>
                    <p class="card-text">${place.vicinity || 'Address not available'}</p>
                    <!-- Add more content here if needed -->
                </div>
            </div>
        `;

        resultsContainer.appendChild(card);
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
        renderMarkers(data.results);
        renderResults(data.results);
    } else {
        console.log('No results found');
    }
}


function initMap() {
const myLatLng = {lat: 46.0878, lng: -64.7782};
map = new google.maps.Map(document.getElementById('googleMaps'),{
  center: myLatLng,
  zoom: 10
});

}

function renderMarkers(places) {
    places.forEach(place => {
      const marker = new google.maps.Marker({
        position: {lat: place.geometry.location.lat, lng: place.geometry.location.lng},
        map: map,
        title: place.name
    });

    const infowindow = new google.maps.InfoWindow({
        content: `<div><strong>${place.name}</strong><br>${place.vicinity}</div>`
    });

    marker.addListener('click', () => {
        infowindow.open(map, marker);
    });
  });
}