// Add all API Scripts to HTML file

// add DOM event listener to let html load first so we have no loading issues. 

// Declare all variables (const, let , var) --> We can Declare API url and Key so we dont need to C&P every time. 
 
/*
    - const apiURL = API URL 
    - const apiKey = API KEY 
*/


//add Start button Event Listner (add console.log to ensure the event works)

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

-Fetch data from google using obstained co-ords from geo results and selectedActivites 
    
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

/*                Displaying the results
 - Make a function to dispaly results 
        - call the container using var/const and use querySeletor or getElement
        
        - clear previous results 

        - make loop to Display and genereate results in containers 
            - loop logic using forEach
            
            places.forEach(place => {
                - const "Element" = document.createElement(What ever element you want ot create); 
                - yourElement.innerHTML = ' all the HTML you want to add ex. "<h3>${place.name}<h3>" 
                We can Dynamically add content   
                    - resultsContainer.appendChild(where we want to add content)

            }
                
*/