let now = new Date();
let dayHour = document.querySelector("#day-hour");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dayHour.innerHTML = `${today}, ${hours}h${minutes}`;

function showTemperature(response) {
  let currentTemperature = document.querySelector("#temperature");
  let roundTemperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${roundTemperature}º C`;
  let feelsLike = document.querySelector("#feels-like");
  let roundFeelsLike = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like ${roundFeelsLike}º C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let speed = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  speed.innerHTML = `Wind: ${windSpeed}km/h`;
  let cityNow = document.querySelector("#current-city");
  cityNow.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusConvertion = response.data.main.temp;
}

function city(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let apiKey = `0dc40d3d7cda209ca40e77430c74cf57`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `0dc40d3d7cda209ca40e77430c74cf57`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function displayFahrhenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusConvertion * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}ºF`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusConvertion)}ºC`;
}

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", city);

let currentCityButton = document.querySelector("#search-button");
currentCityButton.addEventListener("click", city);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrhenheitTemperature);

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", displayCelsiusTemperature);

let celsiusConvertion = null;

citySearch("tokyo");
