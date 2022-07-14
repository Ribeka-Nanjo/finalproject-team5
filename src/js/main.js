    // SEARCH FIELD
    function sendRequest() {
    cityName = document.getElementById("searchfield").value;

    // CURRENT WEATHER 
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=93022b80d2fa47743474256c2ea49a47`;
    let weatherRequest = new XMLHttpRequest();
    weatherRequest.open('GET', weatherURL, true);
    weatherRequest.send();
    weatherRequest.onload =  function () {
    let weatherData = JSON.parse(weatherRequest.responseText);
    document.getElementById('currentImg').setAttribute('src', "https://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png");
    document.getElementById('current').innerHTML = weatherData.weather[0].description;
    document.getElementById('city').innerHTML = weatherData.name;
    document.getElementById('temp').innerHTML = weatherData.main.temp + ' &#8457;';
    document.getElementById('wind').innerHTML = weatherData.wind.speed + ' mph';
    document.getElementById('humid').innerHTML = weatherData.main.humidity + ' &percnt;';
    }

    // FORECAST
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=93022b80d2fa47743474256c2ea49a47`
    const forecast = new XMLHttpRequest();
    forecast.open('GET', forecastURL, true);
    forecast.send();

    forecast.onload = function () {
        const forecastData = JSON.parse(forecast.responseText);
        let weekday = new Array(7);
        weekday[0] = "Mon";
        weekday[1] = "Tue";
        weekday[2] = "Wed";
        weekday[3] = "Thu";
        weekday[4] = "Fri";
        weekday[5] = "Sat";
        weekday[6] = "Sun";
        let count = 1;
        for (let i = 0; i < forecastData.list.length; i++) {
            if (forecastData.list[i].dt_txt.includes("18:00:00")) {
                document.getElementById('forecasttemp'+count).innerHTML=forecastData.list[i].main.temp + ' &#8457;';
                document.getElementById('forecasticon' + count).setAttribute('src', "https://openweathermap.org/img/w/" + forecastData.list[i].weather[0].icon + ".png");
                document.getElementById('forecasticon' + count).setAttribute('alt', forecastData.list[i].weather[0].description);
                document.getElementById('dayforecast' + count).innerHTML = weekday[(new Date().getDay() + count - 1) % 7];
                count++;
            }   
            if (count == 6) {
                break;
            }
        }
    }
}
;
