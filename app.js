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

function getForecast(coordinates) {
  let apiKey = "3f6be1c407b0d9d1933561808db358ba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

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
  getForecast(response.data.coord);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let firstDayMaxTemp = document.querySelector("#first-day-max");
  firstDayMaxTemp.innerHTML = `${Math.round(
    response.data.daily[1].temp.max
  )}ºC`;
  let firstDayMinTemp = document.querySelector("#first-day-min");
  firstDayMinTemp.innerHTML = `${Math.round(
    response.data.daily[1].temp.min
  )}ºC`;
  let firstDayDate = document.querySelector("#first-day");
  //FALTA AQUI DEFINIR O DIA...
  let firstDayIcon = document.querySelector("#first-day-icon");
  //FALTA O ICON

  let secondDayMaxTemp = document.querySelector("#second-day-max");
  secondDayMaxTemp.innerHTML = `${Math.round(
    response.data.daily[2].temp.max
  )}ºC`;
  let secondDayMinTemp = document.querySelector("#second-day-min");
  secondDayMinTemp.innerHTML = `${Math.round(
    response.data.daily[2].temp.min
  )}ºC`;
  let secondDayDate = document.querySelector("#second-day");
  //FALTA AQUI DEFINIR O DIA...
  let secondDayIcon = document.querySelector("#second-day-icon");
  //FALTA O ICON

  let thirdDayMaxTemp = document.querySelector("#third-day-max");
  thirdDayMaxTemp.innerHTML = `${Math.round(
    response.data.daily[3].temp.max
  )}ºC`;
  let thirdDayMinTemp = document.querySelector("#third-day-min");
  thirdDayMinTemp.innerHTML = `${Math.round(
    response.data.daily[3].temp.min
  )}ºC`;
  let thirdDayDate = document.querySelector("#third-day");
  //FALTA AQUI DEFINIR O DIA...
  let thirdDayIcon = document.querySelector("#third-day-icon");
  //FALTA O ICON

  let forthDayMaxTemp = document.querySelector("#forth-day-max");
  forthDayMaxTemp.innerHTML = `${Math.round(
    response.data.daily[4].temp.max
  )}ºC`;
  let forthDayMinTemp = document.querySelector("#forth-day-min");
  forthDayMinTemp.innerHTML = `${Math.round(
    response.data.daily[4].temp.min
  )}ºC`;
  let forthDayDate = document.querySelector("#forth-day");
  //FALTA AQUI DEFINIR O DIA...
  let forthDayIcon = document.querySelector("#forth-day-icon");
  //FALTA O ICON

  let fifthDayMaxTemp = document.querySelector("#fifth-day-max");
  fifthDayMaxTemp.innerHTML = `${Math.round(
    response.data.daily[5].temp.max
  )}ºC`;
  let fifthDayMinTemp = document.querySelector("#fifth-day-min");
  fifthDayMinTemp.innerHTML = `${Math.round(
    response.data.daily[5].temp.min
  )}ºC`;
  let fifthDayDate = document.querySelector("#fifth-day");
  //FALTA AQUI DEFINIR O DIA...
  let fifthDayIcon = document.querySelector("#fifth-day-icon");
  //FALTA O ICON
}

function search(city) {
  let apiKey = `0dc40d3d7cda209ca40e77430c74cf57`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
search("loures");

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
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}º F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusConvertion)}º C`;
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
