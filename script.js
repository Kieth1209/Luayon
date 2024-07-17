const apiKey = 'a26c1c5832a79ad0b510244c09786d2e';

function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    Promise.all([
        fetch(currentWeatherUrl).then(response => response.json()),
        fetch(forecastUrl).then(response => response.json())
    ])
    .then(([currentWeather, forecastData]) => {
        if (currentWeather.cod === 200 && forecastData.cod === '200') {
            displayWeather(currentWeather, forecastData);
            updateBackground(currentWeather.weather[0].main);
        } else {
            alert('City not found');
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayWeather(currentWeather, forecastData) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h2>${currentWeather.name}, ${currentWeather.sys.country}</h2>
        <p>Current Temperature: ${currentWeather.main.temp}°C</p>
        <p>Current Weather: ${currentWeather.weather[0].description}</p>
        <p>Humidity: ${currentWeather.main.humidity}%</p>
        <p>Wind Speed: ${currentWeather.wind.speed} m/s</p>
        <h3>Next 6 Hours Forecast:</h3>
        <div class="forecast">
            ${forecastData.list.slice(0, 6).map(item => `
                <div class="forecast-item">
                    <img class="icon" src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                    <p>${new Date(item.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    <p>${item.main.temp}°C</p>
                    <p>${item.weather[0].description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function updateBackground(weatherCondition) {
    const body = document.querySelector('body');
    let imageUrl = '';

    switch (weatherCondition) {
        case 'Clear':
            imageUrl = 'https://google.com/clear-sky.jpg'; 
            break;
        case 'Clouds':
            imageUrl = 'https://google.com/cloudy-sky.jpg'; 
            break;
        case 'Rain':
            imageUrl = 'https://google.com/rainy-sky.jpg'; 
            break;
        default:
            imageUrl = 'https://google.com/default-background.jpg'; 
            break;
    }
    

    body.style.backgroundImage = `url('${imageUrl}')`;
}
