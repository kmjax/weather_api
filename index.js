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

console.log("TEST D");

// Add an event listener to handle a Calculate request
queryForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    // Grab the form input values
    let cityName = cityInput.value;
    console.log(cityName);
    let stateCode = stateInput.value;
    console.log(stateCode);
    // Create OWM (Open Weather Map) query string
    owmQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},USA&appid=3773a165f8a5e3362d333b9c2856faaa&units=imperial`;
    console.log(owmQueryURL);
    // Fetch the data
    const res = await fetch(owmQueryURL);
    const owmData = await res.json();
    console.log(owmData);

    // TODO: add 404 check to make sure a valid city query was completed.
    //       otherwise, clear the data fields...

    // Populate city title, current conditions, and sun rise/set
    cityTitle.textContent = `Weather for ${owmData.name}, ${stateCode}`;
    let owmCurrentIconURL = `${owmBaseIconURL}${owmData.weather[0].icon}.png`;
    console.log(owmCurrentIconURL);
    currentIcon.setAttribute("src", owmCurrentIconURL);
    currentDescription.textContent = owmData.weather[0].description;
  } catch (error) {
    console.log(error.message);
  }
});
