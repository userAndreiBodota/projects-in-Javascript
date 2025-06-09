function getWeather() {
  const apiKey = "2bf463c57211a86218326cca1317bccb";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please Enter a city");
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
      alert("Error fetching hourly forecast data. Please try again");
    });
}

/* 
Retrieve the API Key and City:

apiKey is the key required to access the OpenWeatherMap API.
city is obtained from an HTML input element with the ID "city".
Check if City is Entered:

If the city input is empty, an alert prompts the user to enter a city and the function exits.
Construct URLs:

currentWeatherUrl is constructed to get the current weather data for the entered city.
forecastUrl is constructed to get the hourly forecast data for the entered city.
Fetch Current Weather Data:

The fetch function sends a request to currentWeatherUrl.
If successful, the response is converted to JSON and passed to displayWeather.
If there's an error, it is logged to the console, and an alert notifies the user.
Fetch Hourly Forecast Data:

Similar to the current weather data, the fetch function sends a request to forecastUrl.
If successful, the response is converted to JSON and passed to displayHourlyForecast.
If there's an error, it is logged to the console, and an alert notifies the user.
*/

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfo = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  weatherInfo.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfo.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `
    <p> ${temperature} °C </p>`;

    const weatherHTML = `
    <p>${cityName}</p>
    <p>${description}</p>`;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfo.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

/*
Select HTML Elements:

tempDivInfo, weatherInfo, weatherIcon, and hourlyForecastDiv are elements where weather data will be displayed.
Clear Previous Data:

Clears any previously displayed data in the selected elements.
Check for Errors:

If the API returns a 404 error code, it means the city was not found. A message is displayed to the user.
Display Weather Data:

Extracts city name, temperature (converted from Kelvin to Celsius), weather description, and icon code from the data.
Constructs the HTML to display the temperature and weather information.
Sets the weather icon's src attribute to the icon URL.
Calls showImage to display the weather icon.
 */

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24hours = hourlyData.slice(0, 8);

  next24hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
<div class"hourly-item">
<span>${hour}:00</span>
<img src = "${iconUrl}" alt="Hourly Weather Icon">
<span>${temperature}°C </span>
</div>`;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

/*Select HTML Element:

hourlyForecastDiv is the element where hourly forecast data will be displayed.
Extract Next 24 Hours Data:

Extracts the first 8 items from hourlyData, assuming each item represents a 3-hour interval.
Display Hourly Data:

For each item in next24hours, it extracts the hour, temperature (converted from Kelvin to Celsius), and icon code.
Constructs HTML to display the hour, temperature, and weather icon.
Appends this HTML to hourlyForecastDiv. */

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
/*
 Display Weather Icon:
Sets the display style of the weather icon element to "block", making it visible.
These functions work together to fetch weather data from the OpenWeatherMap API and display it on the web page, including the current weather and a forecast for the next 24 hours.
 
 */
