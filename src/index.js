function formatDate(dateTime) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let weekday = days[dateTime.getDay()];
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    return `${weekday} ${hours}:${minutes}`;
  }
  
  let mainDate = document.querySelector("#date");
  let newDate = new Date();
  mainDate.innerHTML = formatDate(newDate);
  function celToFahrenheit(event) {
    event.preventDefault();
    let celsiusDegrees = parseFloat(
      document.querySelector("#today-temp").textContent
    );
    let fahrenheitConversion = Math.round((celsiusDegrees * 9) / 5 + 32);
    let fahrenheitDegrees = document.querySelector("#today-temp");
    fahrenheitDegrees.innerHTML = `${fahrenheitConversion}•°`;
  }
  
  function farenheitToCel(event) {
    event.preventDefault();
    let temperature = document.querySelector("#today-temp");
    temperature.innerHTML = `31°`;
  }
  
  let cel = document.querySelector("#celsius-link");
  cel.addEventListener("click", farenheitToCel);
  
  let fah = document.querySelector("#fahrenheit-link");
  fah.addEventListener("click", celToFahrenheit);
  
  function showCityName(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#input-city");
    searchCity(cityInput.value);
  }
  function searchCity(city) {
    let apiKey = `5f472b7acba333cd8a035ea85a0d4d4c`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
  
  function showTemperature(response) {
    let h1 = document.querySelector("h1");
    let h4 = document.querySelector("h4");
    h1.innerHTML = `${response.data.name}`;
    let temperature = Math.round(response.data.main.temp);
    h4.innerHTML = `${temperature}°`;
  }
  let cityname = document.querySelector("#city-form");
  cityname.addEventListener("submit", showCityName);
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemperature);
  }
  
  let currentLocation = document.querySelector("button");
  currentLocation.addEventListener("click", getCurrentLocation);
  