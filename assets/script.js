// Add all API Scripts to HTML file

// add DOM event listener to let html load first so we have no loading issues. 
document.addEventListener("DOMContentLoaded", function() { 

    

// Declare all variables (const, let , var) --> We can Declare API url and Key so we dont need to C&P every time. 
 
const startButton = document.getElementById("startButton")
const inputForm = document.getElementById("inputForm")
const locationInput = document.getElementById("locationInput")
const submitButton = document.getElementById("submitButton")
const googleMaps = document.getElementById("googleMaps") 
const resultsContainer = document.getElementById("resultsContainer")


const apiURL = apiURL 
const apiKey = apiKey



//add Start button Event Listner (add console.log to ensure the event works)
startButton.addEventListener("click", function () {
    console.log("Get Started Button Clicked");
    inputForm.scrollIntoView({ behavior: "smooth" });
});


function fetchGooglePlacesData(lat, lng, numPeople, selectedActivites){
const apiKey ='AIzaSyDspXXMTdpqT9m3s1E7ZiZZgjE7t3sGzy8'; // put api key
const radius = 4000; //raduis for the search

const types = {
  outdoor: 'park',
  swimming: 'swimming_pool',
  trails: 'hiking',
  adventure: 'rock_climbing',
  indoor: 'arts_crafts',
  educational:'puzzles'
};

const selectedTypes = selectedActivites.map(activity =>types[activity]).join('|');
  
   const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&types=${selectedTypes}&key=${AIzaSyDspXXMTdpqT9m3s1E7ZiZZgjE7t3sGzy8}`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    ResponseData(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

function ResponseData(data) {
if (data && data.results) {
  if (data.results.length === 0) {
    console.log ('No results found');
  } else {
    console.log('Places Found:');
    data.results.forEach(place => {
      console.log('Place Name:', place.name);
      console.log('Place Address:', place.vicinity);
  });
}
} else {

  console.log('No results');
}
console.log('Data received', data);
}

const latitude = 48.5554;
const longitude = -87.4594;
const numberOfPeople = 4;
const activities = ['outdoor', 'swimming', 'trails', 'adventure', 'indoor', 'educational'];

fetchGooglePlacesData(latitude, longitude, numberOfPeople, activities);
});
