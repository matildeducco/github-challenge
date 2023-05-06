function currentDate(currentTime) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();

  return `${day} ${month} ${date} ${year} < /br> ${hour}:${minutes}`;
}

let refreshTime = document.querySelector(".right-box");
let now = new Date();
refreshTime.innerHTML = currentDate(now);

//function getCelsius(event) {
//event.preventDefault();
//let h1 = document.querySelector(".temp");
//h1.innerHTML = "19";
//}

//let celsius = document.querySelector(".celsius");
//celsius.addEventListener("click", getCelsius);

//function getFahrenheit(event) {
//event.preventDefault();
//let h1 = document.querySelector(".temp");
//h1.innerHTML = "66";
//}

//let fahrenheit = document.querySelector(".fahrenheit");
//fahrenheit.addEventListener("click", getFahrenheit);

function getLocalTemperature(response) {
  console.log(response);
  let h1 = document.querySelector(".left-box");
  h1.innerHTML = response;
}

function showTemperature(response) {
  let currentTemp = document.querySelector("h1");
  currentTemp.innerHTML = `${response.data.main.temp}`;
  let currentCity = document.querySelector(".left-box");
  currentCity.innerHTML = response.data.name;
}

function search(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city");
  let searchedCity = document.querySelector(".left-box");
  searchedCity.innerHTML = newCity.value;
  let units = "metric";
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", search);
let h1 = document.querySelector(".left-box");
h1.innerHTML = " ";

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(position);
  let showCity = document.querySelector(".left-box");
  let showTemp = document.querySelector(".temp");
  showCity.innerHTML = `${position.name}`;
  showTemp.innerHTML = `Math.round(${position.main.temp})`;
}

function getCurrentLocation(position) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector(".current-location");
button.addEventListener("click", getCurrentLocation);
