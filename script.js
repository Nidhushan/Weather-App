/**
 * Weather App
 * TODO: Complete getWeatherData() to return json response Promise
 * TODO: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

window.onload = function() {
  document.addEventListener('keyup',pressingEnter);
  document.getElementById('city-input').focus();
  document.getElementById('city-input').select();
}

function pressingEnter (event) {
  if(event.keyCode === 13) {
    searchCity();
  }
} 

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  //HINT: Use template literals to create a url with input and an API key
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`
  //CODE GOES HERE
  const weatherPromise = fetch(FULL_URL);
  return weatherPromise.then((response)=>{
    return response.json();
  }) 
}

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
function searchCity() {
  const city = document.getElementById('city-input').value;
  // CODE GOES HERE
  getWeatherData(city)
  .then((response) => {
    console.log(response);
    showWeatherData(response)
  }).catch((error) => {
    console.log(error);
    document.getElementById('city-name').innerHTML = "Undefined";
    document.getElementById('weather-img').src = `images/weatherimg.jpg`;
    document.getElementById('weather-type').innerText = '----';
    document.getElementById('temp').innerText = "--";
    document.getElementById('min-temp').innerText = "--";
    document.getElementById('max-temp').innerText = "--";
  })

  let code = `<input id="city-input" class="form-control form-control-lg" type="text" placeholder="Search city">`;
  document.getElementById('inputCity').innerHTML = code;
  document.getElementById('city-input').focus();
  document.getElementById('city-input').select();
}

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE
    document.getElementById('city-name').innerHTML = weatherData.name;
  document.getElementById('weather-img').src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  document.getElementById('weather-type').innerText = weatherData.weather[0].main;
  document.getElementById('temp').innerText = weatherData.main.temp;
  document.getElementById('min-temp').innerText = weatherData.main.temp_min;
  document.getElementById('max-temp').innerText = weatherData.main.temp_max;
}

