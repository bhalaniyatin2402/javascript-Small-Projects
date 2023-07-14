// declaring all 
const searchInput = document.getElementById("searchInput");
const cityname = document.getElementById('cityname')
const weatherStatus = document.getElementById('weatherStatus')
const currtemp = document.getElementById('currtemp')
const mintemp = document.getElementById('mintemp')
const maxtemp = document.getElementById('maxtemp')
const alertMsg = document.getElementById('alert')

// convert temperature into celcious
Object.prototype.celcious = (number) => {
  let toCelcious = number - 273.15
  return toCelcious.toFixed(2)
}

// for getting the current name of city
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    alertMsg.innerHTML = "Geolocation is not supported by this browser.";
  }
}

async function showPosition(position) {
  cords = {
    lat: position.coords.latitude,
    log: position.coords.longitude
  }
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${cords.lat}&lon=${cords.log}`);
    const result = await response.json()
    const address = result.address;
    const city = address.city || address.town || address.village || address.hamlet || address.state_district;
    getTemp(city)
  } catch (error) {
    alertMsg.innerHTML = 'Failed to retrieve city name'
    console.error(error);
  }
}

// getting temperature of the city
const getTemp = (cityName) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1fa3a2775cc8ba00a55284afb5686e7d`)
    .then(e => e.json())
    .then(e => {
        cityname.innerHTML = e.name
        weatherStatus.innerHTML = e.weather[0].main
        currtemp.innerHTML = `${celcious(e.main.temp)}&deg;C`
        mintemp.innerHTML = `Min ${celcious(e.main.temp_min)}&deg;C`
        maxtemp.innerHTML = `Max ${celcious(e.main.temp_max)}&deg;C`
        weatherIcon()
      }).catch(e => {
        cityname.innerHTML = 'NA'
        weatherStatus.innerHTML = ''
        currtemp.innerHTML = `00&deg;C`
        mintemp.innerHTML = `Min 00&deg;C`
        maxtemp.innerHTML = `Max 00&deg;C`
        weatherIcon()
    })
}

// change icon on the basis of weather status
const weatherIcon = () => {
  if (weatherStatus.innerHTML === 'Clear') {
    weatherStatus.innerHTML = `<i class="fa-sharp fa-solid fa-sun fa-4x" style="color: orange" id="weatherType"></i>`
  } else if (weatherStatus.innerHTML === 'Clouds') {
    weatherStatus.innerHTML = `<i class="fa-solid fa-cloud fa-3x" style="color: lightblue;" id="weatherType"></i>`
  } else if (weatherStatus.innerHTML === 'Rain') {
    weatherStatus.innerHTML = `<i class="fa-sharp fa-solid fa-cloud-rain fa-3x" style="color: lightblue" id="weatherType" ></i>`
  } else if (weatherStatus.innerHTML === 'Snow') {
    weatherStatus.innerHTML = `<i class="fa-solid fa-snowflake fa-3x" id="weatherType"></i>`
  } else if (weatherStatus.innerHTML === 'Thunderstorm') {
    weatherStatus.innerHTML = `<i class="fa-solid fa-cloud-bolt fa-bounce fa-3x" id="weatherType"></i>`
  } else {
    weatherStatus.innerHTML = `<i class="fa-solid fa-cloud fa-3x" style="color: lightblue;" id="weatherType"></i>`
  }
}

// get temperature when page load of current location
document.addEventListener('load', getLocation())

// get tmperature on search locations
searchInput.addEventListener('input', (event) => {
  let search = searchInput.value
  if (search === '') {
    cityname.innerHTML = "NA"
  } else {
    getTemp(search)
  }
})
