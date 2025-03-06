const cityinput = document.querySelector('.city-input');
const searchbtn = document.querySelector('.search-btn');
const searchcitydiv = document.querySelector('.search-city');
const weathercontainerdiv = document.querySelector('.weather-container');
const countrytext = document.querySelector('.country-text');
const temptxt = document.querySelector('.temp-txt');
const conditiontxt = document.querySelector('.condition-txt');
const humidityvalue = document.querySelector('.humidity-value-txt');
const windspeed = document.querySelector('.wind-value-txt');
const summaryimg = document.querySelector('.weather-summary-img');
const currdate = document.querySelector('.current-date-txt');
const forecastcontainer = document.querySelector(".forecast-items-container");

const apikey = '488277f34b54cbe8b7c5083ec3a76eb7'
let city = cityinput.value;

function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'

    }
    return currentDate.toLocaleDateString('en-GB',options);
}


searchbtn.addEventListener("click", () => {
    console.log(cityinput.value);
    updateWeatherInfo(cityinput.value);
    cityinput.value="";
})
async function getFetchData(endpoint, city){
    console.log(city);
    const url = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apikey}&units=metric`
    let response = await fetch(url);
    console.log(response);
    return  response.json()
    
}

async function updateWeatherInfo(city_name) {
    console.log(city_name);
    const weatherData = await getFetchData('weather', city_name)
    
    if(weatherData.cod != 200){
        alert("PAGE NOT FOUND ")
    }
    
    console.log(weatherData)
    

    const data = {
        name:weatherData.name,
        main:[weatherData.main.temp , weatherData.main.humidity],
        weather: [weatherData.weather[0].id, weatherData.weather[0].main],
        wind: weatherData.wind.speed,

    }
    countrytext.textContent = data.name;
    conditiontxt.textContent = data.weather[1];
    humidityvalue.textContent = data.main[1] + '%';
    temptxt.textContent = data.main[0] + '°C';
    windspeed.textContent = data.wind + 'm/s';
    currdate.textContent = getCurrentDate()
    console.log(conditiontxt)
    summaryimg.src = `images/${conditiontxt.innerText.toLowerCase()}.svg`;
    await updateforecastinfo(city_name)
    
    showDisplay(weathercontainerdiv)
    

       
}

function showDisplay(div){
    [weathercontainerdiv, searchcitydiv].forEach(div => div.style.display = 'none')
    div.style.display = 'block';
}

async function updateforecastinfo(city){
    const forecastdata = await getFetchData('forecast', city)
    const timetaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[1]
    
    forecastcontainer.innerHTML=''
    
    forecastdata.list.forEach(forecastweather => {
        if(forecastweather.dt_txt.includes(timetaken) && !forecastweather.dt_txt.includes(todayDate)){
            console.log(forecastweather)
            updateforecastitems(forecastweather)
        
        }
        
    })
   
    
}


function updateforecastitems(weatherforecastData){
    
    const {
        dt_txt: date,
        weather : [{main}],
        main:{temp},

    } = weatherforecastData
    const datetaken = new Date(date)
    const dateoption = {
        day: '2-digit',
        month: 'short',
    }
    const dateresult = datetaken.toLocaleDateString('en-GB', dateoption)
    const forecastitem = `
        <div class="forecast-item">
            <h5 class="forecast-item-date regular-txt">${dateresult}</h5>
            <img src="images/${main.toLowerCase()}.svg"  class="forecast-item-img">
            <h5 class="forecast-item-temp">${temp} °C </h5>
        </div>
    
    `
    forecastcontainer.insertAdjacentHTML('beforeend',forecastitem);
  
}