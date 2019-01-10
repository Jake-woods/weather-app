let lat, lon;

// Function to reduce amount of typing needed to select elements
const elementSelector = (ele) => document.querySelector(ele);

// Remove loading screen after 4 seconds (4000)
const removeLoader = () => {
   const loadingScreen = elementSelector('.loading-container');
   loadingScreen.classList.add('loading-container_close');
}

// Get the user's location
function getLocation() {
   // Checking if navigator is supported
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(foundLocation, returnError);
   }
}

// If the user's location is found
// Do the following
function foundLocation(position) {
   setTimeout(removeLoader, 2000);

   lat = position.coords.latitude;
   lon = position.coords.longitude;

   // Create url to api
   const weatherPath = {
      root: 'https://api.openweathermap.org/data/2.5/weather?',
      lat: `lat=${lat}`,
      lon: `&lon=${lon}`,
      apiKey: '&APPID=662d71acb5ec906ab6915374a80474b6',
      unit: '&units=metric'
   }
   const url = weatherPath.root + weatherPath.lat + weatherPath.lon + weatherPath.apiKey + weatherPath.unit;

   // Fetch url into object
   fetch(url)
      .then(res => res.json())
      .then(data => {
         elementSelector('#city').textContent = data.name;
         elementSelector('#humidity').textContent = `${data.main.humidity}%`;
         elementSelector('#temp').textContent = `${data.main.temp} C`;
         elementSelector('#wind').textContent = `${data.wind.speed} m/s`;
         elementSelector('#type').textContent = data.weather[0].description;
      })
}

// If the user denies access
// Do the following
function returnError() {
   const errorMessage = elementSelector('.error-message');
   errorMessage.textContent = 'Please grant access to location';
}

// Call get location when everything loads
window.onload = getLocation();