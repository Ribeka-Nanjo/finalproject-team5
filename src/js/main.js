function WeatherUserInfo() {
    
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = newName.value;

    // CURRENT WEATHER 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+newName.value+`&units=metric&APPID=93022b80d2fa47743474256c2ea49a47`)
    .then(response => response.json())
    .then(current => {
        document.getElementById('currentImg').setAttribute('src', "https://openweathermap.org/img/w/" + current.weather[0].icon + ".png");
        document.getElementById('current').innerHTML = current.weather[0].description;
        document.getElementById('temp').innerHTML = current.main.temp + " °C";
        document.getElementById('wind').innerHTML = current.wind.speed + ' m/s';
        document.getElementById('humid').innerHTML = current.main.humidity + ' &percnt;';
        console.log(current)
    })

    // FORECAST
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&units=metric&APPID=93022b80d2fa47743474256c2ea49a47')
    .then(response => response.json())
    .then(data => {
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Temp").innerHTML = Number(data.list[i].main.temp).toFixed(1)+ "°C";
    }
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    console.log(data)


    })
    .catch(err => cityName.innerHTML = "<span style='color: crimson'>Error: Check City Name</span>")
    }
    function weatherMapper(){
        document.getElementById("cityInput").defaultValue = "London";
        WeatherUserInfo();
    }
    var d = new Date();
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
    function CheckDay(day){
        if(day + d.getDay() > 6){
            return day + d.getDay() - 7;
        }
        else{
            return day + d.getDay();
        }
    }
        for(i = 0; i<5; i++){
            document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
        }
   