// ===============================================
// Code to fetch and display the weather for a
// user provided city and state.
//
// Jaxcode Day 11 Homework Assignment
//
// Author: Kelsey McClanahan
// Date:   11/22/2020
// ===============================================

// alert(
//   "Hello World\nThis lets us know the JavaScript\nsource is linked with this page.\n\nThis form is non-functional at the moment."
// );

console.log("TEST A");

// Grab references to the form and its input controls
const queryForm = document.getElementById("query-form");
const cityInput = document.getElementById("city-input");
const stateInput = document.getElementById("state-input");
console.log(queryForm);
console.log(cityInput);
console.log(stateInput);

console.log("TEST B");

// Grab references to the output items
const cityTitle = document.getElementById("city-title");
const currentIcon = document.getElementById("current-icon");
const currentDescription = document.getElementById("current-description");

console.log("TEST C");

// Create other variables
const owmBaseIconURL = "https://openweathermap.org/img/wn/";
let owmQueryURL = "";
let stateCode = "";

console.log("TEST D");

// Reset Page Elements
ResetPageOutputElements();

// Add an event listener to handle a Calculate request
queryForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    // Grab the form input values
    let cityName = cityInput.value;
    console.log(cityName);
    stateCode = stateInput.value;
    console.log(stateCode);
    // Create OWM (Open Weather Map) query string
    owmQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},USA&appid=3773a165f8a5e3362d333b9c2856faaa&units=imperial`;
    console.log(owmQueryURL);
    // Fetch the data
    const res = await fetch(owmQueryURL);
    let owmData = await res.json();
    console.log(owmData);

    // Check the returned status code from the query.
    // If it is 200, then display the data. Otherwise, reset page elements
    // and display the returned error message.
    let owmQueryResultCode = owmData.cod;
    console.log(owmQueryResultCode);
    if (owmQueryResultCode == 200) {
      SetPageOutputElements(owmData);
    } else {
      ResetPageOutputElements();
      cityTitle.textContent = owmData.message;
    }
  } catch (error) {
    console.log(error.message);
  }
});

function SetPageOutputElements(weatherData) {
  // Populate city title, current conditions, and sunrise/set
  cityTitle.textContent = `Weather for ${weatherData.name}, ${stateCode}`;
  let owmCurrentIconURL = `${owmBaseIconURL}${weatherData.weather[0].icon}.png`;
  console.log(owmCurrentIconURL);
  currentIcon.setAttribute("src", owmCurrentIconURL);
  currentDescription.textContent = weatherData.weather[0].description;

  // remove the dimmed text color
  cityTitle.classList.remove("dimmed-color");
  currentDescription.classList.remove("dimmed-color");
}

function ResetPageOutputElements() {
  // Reset city titule, current conditions, and sunrise/set
  cityTitle.textContent = "Enter city/state and click Get Weather";
  currentDescription.textContent = "unknown condition";
  cityTitle.classList.add("dimmed-color");
  currentIcon.setAttribute("src", "images/square.png");
  currentDescription.classList.add("dimmed-color");
}
