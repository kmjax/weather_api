### Project: Weather API

#### LINKS

1. This project's page: [https://kmjax.surge.sh/hw/2020-11-19_weather/](https://kmjax.surge.sh/hw/2020-11-19_weather/)
1. Menu of all projects: [https://kmjax.surge.sh](https://kmjax.surge.sh)

#### DESCRIPTION

This is a web page form that lets a user enter a city/state, and then displays current weather information for that city. Where available, the appropriate visual icons from the Open Weather site will be used. The following data will be displayed:

- a) temperature: current, min, max
- b) humidty
- c) description and icon
- d) visibility
- e) wind speed and compass direction
- f) Sunrise and Sunset
- g) 4 day forecast (\*\*\*\* maybe/maybe NOT! this is not set in stone)

#### STATUS

~82% Complete. _Going to rewrite the data fetch!!!_ Going to use the base "weather" query to get some of the information and the lat/lon for the city. Next, will use the lat/lon for a new "onecall" query to get additional information including the daily highs and lows along with forcasted data.

The original base query is working and returning data from OpenWeatherMap.org. The following information is displayed: conditions, sunrise/set, wind speed and direction, visibility, current temperature, and humidity.

#### SOURCE

Github repository: [https://github.com/kmjax/weather_api](https://github.com/kmjax/weather_api)

Clone from Github via HTTPS:

`git clone https://github.com/kmjax/weather_api.git`
