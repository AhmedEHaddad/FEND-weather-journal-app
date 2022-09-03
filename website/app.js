/* Global Variables */

// HTML element to listen for click events
const button = document.getElementById('generate')

// HTML elements to get the values
const zip = document.getElementById('zip')
//const feelings = document.getElementById('feelings')

// HTML elements to update dynamically
const date = document.getElementById('date')
const temp = document.getElementById('temp')
//const content = document.getElementById('content')


//OpenWeatherMap API key
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'cb1bcbb049c4632e066ef5d9f01d6e53';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* add functionallity to generate button */
// add eventlistener to button
document.getElementById('generate').addEventListener('click', performAction);
// function
function performAction(e) {
    e.preventDefault();
    // get user input values
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
  
    getWeatherInfo(newZip)
      .then(function (apiData) {
        // add data to POST request
        postData('/api', { date: newDate, temp: apiData.main.temp, feelings })
      }).then(function (newData) {
        // update browser content
        updateUI()
      })
    // reset form
    form.reset();
  }

/* get route */
// GET weather API data
const getWeatherInfo = async (zip) => {
await fetch(`${baseUrl}?zip=${zip}&units=imperial&APPID=${apiKey}`);
try {
    // result of fetch function
    const apiData = await res.json();
    return apiData;
  } catch (error) {
    console.log("error", error);
  }

}

/* Post route client side*/
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      //body: JSON.stringify(data), 
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      }),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
  /* dynamically update UI */
  const updateUI = async () => {
    const request = await fetch('/api');
    try {
      const allData = await request.json()
      
      // update new  values
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('content').innerHTML = allData.content;
    }
    catch (error) {
      console.log("error", error);
    }
  };
