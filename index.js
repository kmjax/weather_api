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

// Grab references to the form and its input controls
const queryForm = document.getElementById("query-form");
const cityInput = document.getElementById("city-input");
const stateInput = document.getElementById("state-input");

// Grab references to the output items
const cityTitle = document.getElementById("city-title");
const currentIcon = document.getElementById("current-icon");
const currentDescription = document.getElementById("current-description");
const sunriseTime = document.getElementById("sunrise-time");
const sunsetTime = document.getElementById("sunset-time");
const windSpeed = document.getElementById("wind-speed");
const windDirection = document.getElementById("wind-direction");
const visibility = document.getElementById("visibility");

// Create other variables
const owmBaseIconURL = "https://openweathermap.org/img/wn/";
let owmQueryURL = "";
let stateCode = "";

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
  sunriseTime.textContent = getTimeFromUnixTimestamp(weatherData.sys.sunrise);
  sunsetTime.textContent = getTimeFromUnixTimestamp(weatherData.sys.sunset);
  windSpeed.textContent = `${weatherData.wind.speed.toFixed(1)} mph`;
  windDirection.textContent = getCardinalDirectionFromDegrees(
    weatherData.wind.deg
  );
  visibility.textContent = `${formatThousands(weatherData.visibility)} ft`;

  // remove the dimmed text color
  cityTitle.classList.remove("dimmed-color");
  currentDescription.classList.remove("dimmed-color");
  sunriseTime.classList.remove("dimmed-color");
  sunsetTime.classList.remove("dimmed-color");
  windSpeed.classList.remove("dimmed-color");
  windDirection.classList.remove("dimmed-color");
  visibility.classList.remove("dimmed-color");
}

function ResetPageOutputElements() {
  // Reset city titule, current conditions, and sunrise/set
  cityTitle.textContent = "Enter city/state and click 'Get Weather'";
  currentIcon.setAttribute("src", "images/square.png");
  currentDescription.textContent = "Unknown conditions";
  sunriseTime.textContent = "-:-- am";
  sunsetTime.textContent = "-:-- pm";

  // Reset wind and visibility
  windSpeed.textContent = "0 mph";
  windDirection.textContent = "";
  visibility.textContent = "------ ft";

  // Dim out all of these page elements
  cityTitle.classList.add("dimmed-color");
  currentDescription.classList.add("dimmed-color");
  sunriseTime.classList.add("dimmed-color");
  sunsetTime.classList.add("dimmed-color");
  windSpeed.classList.add("dimmed-color");
  windDirection.classList.add("dimmed-color");
  visibility.classList.add("dimmed-color");
}

// Conversion Functions

// Convert unix timestamp to a time string (i.e., 11:22 am)
function getTimeFromUnixTimestamp(unixTimestamp) {
  let milliseconds = unixTimestamp * 1000;
  let weatherDate = new Date(milliseconds);
  let ampm = "";
  let hours = weatherDate.getHours();
  if (hours == 0) {
    ampm = "am";
    hours = 12;
  } else if (hours < 12) {
    ampm = "am";
  } else {
    ampm = "pm";
    hours -= 12;
  }
  let minutes = weatherDate.getMinutes();
  let timeString = `${hours.toString()}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  // let timeString = `${weatherDate.toLocaleDateString("en-US", {
  //   hour: "numeric"})}:${weatherDate.toLocaleDateString("en-US", { minute: "numeric" })}`;
  console.log(timeString);
  return timeString;
}

// Convert wind degrees to a cardinal compass direction (i.e., SW)
function getCardinalDirectionFromDegrees(deg) {
  if (deg >= 348.75 || deg < 11.25) {
    return "N";
  } else if (deg >= 11.25 && deg < 33.75) {
    return "NNE";
  } else if (deg >= 33.75 && deg < 56.25) {
    return "NE";
  } else if (deg >= 56.25 && deg < 78.75) {
    return "ENE";
  } else if (deg >= 78.75 && deg < 101.25) {
    return "E";
  } else if (deg >= 101.25 && deg < 123.75) {
    return "ESE";
  } else if (deg >= 123.75 && deg < 146.25) {
    return "SE";
  } else if (deg >= 146.25 && deg < 168.75) {
    return "SSE";
  } else if (deg >= 168.75 && deg < 191.25) {
    return "S";
  } else if (deg >= 191.25 && deg < 213.75) {
    return "SSW";
  } else if (deg >= 213.75 && deg < 236.25) {
    return "SW";
  } else if (deg >= 236.25 && deg < 258.75) {
    return "WSW";
  } else if (deg >= 258.75 && deg < 281.25) {
    return "W";
  } else if (deg >= 281.25 && deg < 303.75) {
    return "WNW";
  } else if (deg >= 303.75 && deg < 326.25) {
    return "NW";
  } else if (deg >= 326.25 && deg < 348.75) {
    return "NNW";
  }
}

function formatThousands(num) {
  let numString = num.toString();
  numCommasString = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return numCommasString;
}
