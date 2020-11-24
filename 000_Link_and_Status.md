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
- g) 4 day forecast  (**** maybe/maybe NOT! this is not set in stone)


#### STATUS

~75% Complete. Base query is working and returning data from OpenWeatherMap.org. Only a few fields are displaying retrieved data. Functions were created to display the fetched data as well as reset/dim text when there is no data to be displayed. The query result code is now being checked for "200" that indicates it was successful. When successful, the data is then displayed --otherwise the associated query error message is displayed and fields are reset/dimmed. The entire core of the logic is now in place and functional --just need to finish fetching and displaying data for all webpage elements.


#### SOURCE

Github repository: [https://github.com/kmjax/weather_api](https://github.com/kmjax/weather_api)

Clone from Github via HTTPS:

`git clone https://github.com/kmjax/weather_api.git`
