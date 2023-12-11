// Add all API Scripts 

// add DOM event listener to let html load first so we have no loading issues. 
document.addEventListener("DOMContentLoaded", function() { 

    

// Declare all variables (const, let , var) --> We can Declare API url and Key so we dont need to C&P every time. 
 
const startButton = document.getElementById("startButton")
const inputForm = document.getElementById("activity-form")
const locationInput = document.getElementById("locationInput")
const submitButton = document.getElementById("submitButton")
const googleMaps = document.getElementById("googleMaps") 
const resultsContainer = document.getElementById("resultsContainer")
const activityForm = document.getElementById("activity-form");


const apiURL = " add apiUrl" 
const apiKey = " add apiKey"



//add Start button Event Listner (add console.log to ensure the event works)
startButton.addEventListener("click", function () {
    console.log("Get Started Button Clicked");
    inputForm.scrollIntoView({ behavior: "smooth" });
});


// Event listner to handle form
submitButton.addEventListener("click", function (event ) {
    event.preventDefault();
    console.log("Submit Button Clicked")
    
    
    // Fetch data from API using locationInput and selectedActivities
   
    const location = document.getElementById("locationInput").value;
    const selectedActivities = getSelectedActivities();
   
    console.log("Selected Activities:",getSelectedActivities() );
    console.log ("Form Submitted with location:",location);
    
   
   
   // function to put selected activites from checkboxes into array and declare in variable
   function getSelectedActivities() { 
    const checkboxes = document.querySelectorAll('input[name="favoriteActivity"]:checked');
    const selectedActivites = Array.from(checkboxes).map(checkbox => checkbox.value);
    return selectedActivites; 

   //fetchGoogleMapsData(location,selectedActivites);

    
    }


});



// function to render results from Google APIs into results containers
function renderResults(places) {
    resultsContainer.innerHTML = ""; 
   
    //loop for places to render each one 
    places.forEach(element => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("col-md-4") // bootstrap column class 

        const resultContent = `
    <div class="result">
        <h3>${element.name}</h3>
        <p>${element.address}</p>
    </div>
`;

        resultElement.innerHTML = resultContent
        resultsContainer.appendChild(resultElement);
        
    });
}



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
=======
-Fetch data from google using obtained co-ords from geo results and selectedActivites 
    
    - use apiUrl variable
    
    Make Fetch reqeust using (apiUrl) with .then and (response =>)
        - Check to see if request was successful -->  if statement === 200
        - Have the browser through an error using Modul instead of errors  

        - Parse the JSOON response 

    Then use .then to handle the response 
        - consol the data response something like ("Google Response", data)

        - set a const to where we want the data displayed 
            --> const places = data.results;
            - call the function that will handle displaying the data 
                - ex. somethingSomething(places)
    Catch to handle errors 
        - 
*/
