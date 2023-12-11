// Add all API Scripts to HTML file

// add DOM event listener to let html load first so we have no loading issues. 
document.addEventListener("DOMContentLoaded", function() { 

    
});
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


    //Handle Form submission --> add Event to "Submit Button" --> API form Data and then triggger Google Maps API

/* Form submission 
- Add event listener to button 
    - we might have to prevent default form submission
    
Declare the const/var we need to use to get the Data from the form
    - location/numofPeople

Declare const/var to get selected activities from check boxes
    - querySelector  and then we can run a forEach loop to run through all the checkboxes. 
    - console.log all selected data from checkboxes 


Trigger Google Maps API 
    - need to use all 3 inputs (location, numofPeople, selected Activites)
*/

/* Function for calling APIs 

Make Function for calling Google Maps API --> We should tihnk about using GeoCode 
    - We need to call the 3 inputs again 
    - If we use Geo Code we will have to change the way the users input the data 
GeoCode 
    -  variable.geocode({ address: location }
        - conditional statement to handle OK statement from API 
    
    - Get Lat/Long from first results fetch
        - set variables for lat/long with results[0]--> will be returned in a Array and location lat()/lng()
*/


/*
Make Fetch Function after getting Geo coding results to obtain users location

        - Fet Google Maps API with (lat,lng,numPeople, selectedActivites)
        - make conditional statement in the console if error occurs fetching data 

*/

/*

Fetch Function Template 

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
function fetchGooglePlacesData(lat, lng, numPeople, selectedActivites){
var apiKey ='AIzaSyDspXXMTdpqT9m3s1E7ZiZZgjE7t3sGzy8'; // put api key
var radius = 4000; //raduis for the search

var types = {
  outdoor: 'park',
  swimming: 'swimming_pool',
  trails: 'hiking',
  adventure: 'rock_climbing',
  indoor: 'arts_crafts',
  educational:'puzzles'
};

var selectedTypes = selectedActivites.map(activity =>types[activity]).join('|');
  
   var apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&types=${selectedTypes}&key=${AIzaSyDspXXMTdpqT9m3s1E7ZiZZgjE7t3sGzy8}`;

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

var latitude = 48.5554;
var longitude = -87.4594;
var numberOfPeople = 4;
var activities = ['outdoor', 'swimming', 'trails', 'adventure', 'indoor', 'educational'];

fetchGooglePlacesData(latitude, longitude, numberOfPeople, activities);

