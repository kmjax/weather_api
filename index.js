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
const currentTemp = document.getElementById("current-temp");
const feelsLike = document.getElementById("feels-like");
const lowTemp = document.getElementById("low-temp");
const highTemp = document.getElementById("high-temp");
const humidty = document.getElementById("humidity");
const uvIndex = document.getElementById("uv-index");
const dewPoint = document.getElementById("dew-point");
const windSpeed = document.getElementById("wind-speed");
const windDirection = document.getElementById("wind-direction");
const cloudCoverage = document.getElementById("cloud-coverage");
const visibility = document.getElementById("visibility");

// Grab more references, this time to the forecast rows
const day1Date = document.getElementById("day-1-date");
const day1Icon = document.getElementById("day-1-icon");
const day1Description = document.getElementById("day-1-description");
const day1Temps = document.getElementById("day-1-temps");
const day2Date = document.getElementById("day-2-date");
const day2Icon = document.getElementById("day-2-icon");
const day2Description = document.getElementById("day-2-description");
const day2Temps = document.getElementById("day-2-temps");
const day3Date = document.getElementById("day-3-date");
const day3Icon = document.getElementById("day-3-icon");
const day3Description = document.getElementById("day-3-description");
const day3Temps = document.getElementById("day-3-temps");
const day4Date = document.getElementById("day-4-date");
const day4Icon = document.getElementById("day-4-icon");
const day4Description = document.getElementById("day-4-description");
const day4Temps = document.getElementById("day-4-temps");
const day5Date = document.getElementById("day-5-date");
const day5Icon = document.getElementById("day-5-icon");
const day5Description = document.getElementById("day-5-description");
const day5Temps = document.getElementById("day-5-temps");

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
    // Grab the form's input values
    let cityName = cityInput.value;
    stateCode = stateInput.value.toUpperCase();
    let cityLat = 0.0;
    let cityLong = 0.0;

    // Create OWM (Open Weather Map) query string
    owmQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},USA&appid=3773a165f8a5e3362d333b9c2856faaa&units=imperial`;
    // console.log(owmQueryURL);

    // Fetch the data
    const owmResult = await fetch(owmQueryURL);
    let owmData = await owmResult.json();
    console.log(owmData);

    // Check the returned status code from the query. If it
    // is 200 (successful), then make the next query using the
    // lat/lon from the first query. Next, process and display
    // the data. Otherwise, reset page elements and display
    // the returned error message.
    let owmQueryResultCode = owmData.cod;
    // console.log(owmQueryResultCode);
    if (owmQueryResultCode == 200) {
      // Grab the lat/lon of the city
      cityLat = owmData.coord.lat;
      cityLong = owmData.coord.lon;
      // Create the next OWM query string
      owmQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat.toString()}&lon=${cityLong.toString()}&exclude=minutely,hourly&appid=3773a165f8a5e3362d333b9c2856faaa&units=imperial`;
      const owmResult2 = await fetch(owmQueryURL);
      let owmData2 = await owmResult2.json();
      console.log(owmData2);
      // Call the function to process and display the fetched data
      SetPageOutputElements(owmData, owmData2);
    } else {
      ResetPageOutputElements();
      cityTitle.textContent = owmData.message;
    }
  } catch (error) {
    console.log(error.message);
  }
});

function SetPageOutputElements(weatherData, onecallData) {
  // Populate city title
  cityTitle.textContent = `Weather for ${weatherData.name}, ${stateCode}`;

  // Populate temperatures
  currentTemp.innerHTML = `${weatherData.main.temp.toFixed(1)}&deg; F`;
  feelsLike.innerHTML = `${weatherData.main.feels_like.toFixed(1)}&deg; F`;
  lowTemp.innerHTML = `${onecallData.daily[0].temp.min.toFixed(1)}&deg; F`;
  highTemp.innerHTML = `${onecallData.daily[0].temp.max.toFixed(1)}&deg; F`;

  // Populate humidity, uv index, and dew point
  humidty.innerHTML = `${weatherData.main.humidity}%`;
  uvIndex.textContent = onecallData.current.uvi.toFixed(1);
  dewPoint.innerHTML = `${onecallData.current.dew_point.toFixed(1)}&deg; F`;

  // Populate wind speed and direction, and visibility
  windSpeed.textContent = `${weatherData.wind.speed.toFixed(1)} mph`;
  windDirection.textContent = getCardinalDirectionFromDegrees(
    weatherData.wind.deg
  );
  cloudCoverage.innerHTML = `${onecallData.current.clouds.toString()}%`;
  visibility.textContent = `${formatThousands(weatherData.visibility)} ft`;

  // Populate current conditions and sunrise/set
  let weatherIconURL = `${owmBaseIconURL}${weatherData.weather[0].icon}.png`;
  //console.log(owmCurrentIconURL);
  currentIcon.setAttribute("src", weatherIconURL);
  currentDescription.textContent = weatherData.weather[0].description;
  sunriseTime.textContent = getTimeFromUnixTimestamp(weatherData.sys.sunrise);
  sunsetTime.textContent = getTimeFromUnixTimestamp(weatherData.sys.sunset);

  // Populate the Five Day Forecast table
  // ------------------------------------------------------------------
  // NOTE!!! This could be handled better with a loop to dynamically
  // process all five days and generate the necessary HTML. However,
  // this is done purely view manual assignments for the scope of this
  // project.

  let minTemp = "";
  let maxTemp = "";
  let forecastDate = "";

  // All of the forecast data comes from the OneCall data query

  // DAY 1
  forecastDate = getDateFromUnixTimestamp(onecallData.daily[1].dt);
  day1Date.textContent = forecastDate;
  weatherIconURL = `${owmBaseIconURL}${onecallData.daily[1].weather[0].icon}.png`;
  day1Icon.setAttribute("src", weatherIconURL);
  day1Description.textContent = onecallData.daily[1].weather[0].description;
  minTemp = onecallData.daily[1].temp.min.toFixed(1);
  maxTemp = onecallData.daily[1].temp.max.toFixed(1);
  day1Temps.innerHTML = `Low: ${minTemp}&deg; / High: ${maxTemp}&deg; F`;
  // DAY 2
  forecastDate = getDateFromUnixTimestamp(onecallData.daily[2].dt);
  day2Date.textContent = forecastDate;
  weatherIconURL = `${owmBaseIconURL}${onecallData.daily[2].weather[0].icon}.png`;
  day2Icon.setAttribute("src", weatherIconURL);
  day2Description.textContent = onecallData.daily[2].weather[0].description;
  minTemp = onecallData.daily[2].temp.min.toFixed(1);
  maxTemp = onecallData.daily[2].temp.max.toFixed(1);
  day2Temps.innerHTML = `Low: ${minTemp}&deg; / High: ${maxTemp}&deg; F`;
  // DAY 3
  forecastDate = getDateFromUnixTimestamp(onecallData.daily[3].dt);
  day3Date.textContent = forecastDate;
  weatherIconURL = `${owmBaseIconURL}${onecallData.daily[3].weather[0].icon}.png`;
  day3Icon.setAttribute("src", weatherIconURL);
  day3Description.textContent = onecallData.daily[3].weather[0].description;
  minTemp = onecallData.daily[3].temp.min.toFixed(1);
  maxTemp = onecallData.daily[3].temp.max.toFixed(1);
  day3Temps.innerHTML = `Low: ${minTemp}&deg; / High: ${maxTemp}&deg; F`;
  // DAY 4
  forecastDate = getDateFromUnixTimestamp(onecallData.daily[4].dt);
  day4Date.textContent = forecastDate;
  weatherIconURL = `${owmBaseIconURL}${onecallData.daily[4].weather[0].icon}.png`;
  day4Icon.setAttribute("src", weatherIconURL);
  day4Description.textContent = onecallData.daily[4].weather[0].description;
  minTemp = onecallData.daily[4].temp.min.toFixed(1);
  maxTemp = onecallData.daily[4].temp.max.toFixed(1);
  day4Temps.innerHTML = `Low: ${minTemp}&deg; / High: ${maxTemp}&deg; F`;
  // DAY 5
  forecastDate = getDateFromUnixTimestamp(onecallData.daily[5].dt);
  day5Date.textContent = forecastDate;
  weatherIconURL = `${owmBaseIconURL}${onecallData.daily[5].weather[0].icon}.png`;
  day5Icon.setAttribute("src", weatherIconURL);
  day5Description.textContent = onecallData.daily[5].weather[0].description;
  minTemp = onecallData.daily[5].temp.min.toFixed(1);
  maxTemp = onecallData.daily[5].temp.max.toFixed(1);
  day5Temps.innerHTML = `Low: ${minTemp}&deg; / High: ${maxTemp}&deg; F`;

  // remove the dimmed text color
  cityTitle.classList.remove("dimmed-color");
  currentDescription.classList.remove("dimmed-color");
  sunriseTime.classList.remove("dimmed-color");
  sunsetTime.classList.remove("dimmed-color");
  currentTemp.classList.remove("dimmed-color");
  feelsLike.classList.remove("dimmed-color");
  lowTemp.classList.remove("dimmed-color");
  highTemp.classList.remove("dimmed-color");
  humidity.classList.remove("dimmed-color");
  uvIndex.classList.remove("dimmed-color");
  dewPoint.classList.remove("dimmed-color");
  windSpeed.classList.remove("dimmed-color");
  windDirection.classList.remove("dimmed-color");
  cloudCoverage.classList.remove("dimmed-color");
  visibility.classList.remove("dimmed-color");
  day1Date.classList.remove("dimmed-color");
  day1Icon.classList.remove("dimmed-color");
  day1Description.classList.remove("dimmed-color");
  day1Temps.classList.remove("dimmed-color");
  day2Date.classList.remove("dimmed-color");
  day2Icon.classList.remove("dimmed-color");
  day2Description.classList.remove("dimmed-color");
  day2Temps.classList.remove("dimmed-color");
  day3Date.classList.remove("dimmed-color");
  day3Icon.classList.remove("dimmed-color");
  day3Description.classList.remove("dimmed-color");
  day3Temps.classList.remove("dimmed-color");
  day4Date.classList.remove("dimmed-color");
  day4Icon.classList.remove("dimmed-color");
  day4Description.classList.remove("dimmed-color");
  day4Temps.classList.remove("dimmed-color");
  day5Date.classList.remove("dimmed-color");
  day5Icon.classList.remove("dimmed-color");
  day5Description.classList.remove("dimmed-color");
  day5Temps.classList.remove("dimmed-color");
}

function ResetPageOutputElements() {
  // Reset city titule, current conditions, and sunrise/set
  cityTitle.textContent = "Enter city/state and click 'Get Weather'";
  currentIcon.setAttribute("src", "images/square.png");
  currentDescription.textContent = "Unknown conditions";
  sunriseTime.textContent = "-:-- am";
  sunsetTime.textContent = "-:-- pm";
  currentTemp.innerHTML = "--.- &deg; F";
  feelsLike.innerHTML = "--.- &deg; F";
  lowTemp.innerHTML = "--.- &deg; F";
  highTemp.innerHTML = "--.- &deg; F";
  humidity.textContent = "--%";
  uvIndex.textContent = "-.-";
  dewPoint.innerHTML = "--.- &deg; F";

  // Reset wind and visibility
  windSpeed.textContent = "0 mph";
  windDirection.textContent = "";
  cloudCoverage.textContent = "--%";
  visibility.textContent = "------ ft";

  // Reset forecast rows
  day1Date.textContent = "--/--";
  day1Icon.setAttribute("src", "images/square.png");
  day1Description.textContent = "unknown forecast";
  day1Temps.innerHTML = `Low: --.-&deg; / High: --.-&deg; F`;
  day2Date.textContent = "--/--";
  day2Icon.setAttribute("src", "images/square.png");
  day2Description.textContent = "unknown forecast";
  day2Temps.innerHTML = `Low: --.-&deg; / High: --.-&deg; F`;
  day3Date.textContent = "--/--";
  day3Icon.setAttribute("src", "images/square.png");
  day3Description.textContent = "unknown forecast";
  day3Temps.innerHTML = `Low: --.-&deg; / High: --.-&deg; F`;
  day4Date.textContent = "--/--";
  day4Icon.setAttribute("src", "images/square.png");
  day4Description.textContent = "unknown forecast";
  day4Temps.innerHTML = `Low: --.-&deg; / High: --.-&deg; F`;
  day5Date.textContent = "--/--";
  day5Icon.setAttribute("src", "images/square.png");
  day5Description.textContent = "unknown forecast";
  day5Temps.innerHTML = `Low: --.-&deg; / High: --.-&deg; F`;

  // Dim out all of these page elements
  cityTitle.classList.add("dimmed-color");
  currentDescription.classList.add("dimmed-color");
  sunriseTime.classList.add("dimmed-color");
  sunsetTime.classList.add("dimmed-color");
  currentTemp.classList.add("dimmed-color");
  feelsLike.classList.add("dimmed-color");
  lowTemp.classList.add("dimmed-color");
  highTemp.classList.add("dimmed-color");
  humidity.classList.add("dimmed-color");
  uvIndex.classList.add("dimmed-color");
  dewPoint.classList.add("dimmed-color");
  windSpeed.classList.add("dimmed-color");
  windDirection.classList.add("dimmed-color");
  cloudCoverage.classList.add("dimmed-color");
  visibility.classList.add("dimmed-color");
  day1Date.classList.add("dimmed-color");
  day1Icon.classList.add("dimmed-color");
  day1Description.classList.add("dimmed-color");
  day1Temps.classList.add("dimmed-color");
  day2Date.classList.add("dimmed-color");
  day2Icon.classList.add("dimmed-color");
  day2Description.classList.add("dimmed-color");
  day2Temps.classList.add("dimmed-color");
  day3Date.classList.add("dimmed-color");
  day3Icon.classList.add("dimmed-color");
  day3Description.classList.add("dimmed-color");
  day3Temps.classList.add("dimmed-color");
  day4Date.classList.add("dimmed-color");
  day4Icon.classList.add("dimmed-color");
  day4Description.classList.add("dimmed-color");
  day4Temps.classList.add("dimmed-color");
  day5Date.classList.add("dimmed-color");
  day5Icon.classList.add("dimmed-color");
  day5Description.classList.add("dimmed-color");
  day5Temps.classList.add("dimmed-color");
}

// =====================================================================
// Conversion Functions
// =====================================================================

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
  // console.log(timeString);
  return timeString;
}

function getDateFromUnixTimestamp(unixTimestamp) {
  let milliseconds = unixTimestamp * 1000;
  let weatherDate = new Date(milliseconds);
  let month = weatherDate.getMonth() + 1;
  let day = weatherDate.getDate();
  let dateString = `${month.toString()}/${day.toString().padStart(2, "0")}`;
  // console.log(dateString);
  return dateString;
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
