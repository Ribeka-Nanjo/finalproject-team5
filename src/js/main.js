// VARIABLES

var cityNameKey = document.getElementById("cityInput");
const current = document.getElementById('current');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const humid = document.getElementById('humid');
const local = localStorage
var d = new Date();
var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", ];

// FUNCTIONS

function WeatherUserInfo() {
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");

    // CURRENT WEATHER 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + newName.value + `&units=metric&APPID=93022b80d2fa47743474256c2ea49a47`)
        .then(response => response.json())
        .then(current => {
            document.getElementById('cityName').innerHTML = newName.value.toLowerCase();
            document.getElementById('currentImg').setAttribute('src', "https://openweathermap.org/img/w/" + current.weather[0].icon + ".png");
            document.getElementById('current').value = current.weather[0].description;
            document.getElementById('temp').value = current.main.temp + " °C";
            document.getElementById('wind').value = current.wind.speed + ' m/s';
            document.getElementById('humid').value = current.main.humidity + ' %';
        })
        .catch(err => cityName.innerHTML = "<span style='color: crimson'>Error:</br> Check City Name</span>")

    // FORECAST
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&units=metric&APPID=93022b80d2fa47743474256c2ea49a47')
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Temp").innerHTML = Number(data.list[i].main.temp).toFixed(1) + " °C";
            }
            for (i = 0; i < 5; i++) {
                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon +
                    ".png";
            }

        })
        .catch(err => cityName.innerHTML = "<span style='color: crimson'>Error:</br> Check City Name</span>")
}

function weatherMapper() {
    document.getElementById("cityInput").defaultValue = "London";
    WeatherUserInfo();
}

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}
for (i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

// SAVE DATA TO LOCAL STORAGE

function saveData() {

    let data = {
        "city": cityNameKey.value.toLowerCase(),
        "tempreture": temp.value,
        "wind": wind.value,
        "humid": humid.value
    }
    local.setItem(cityNameKey.value.toLowerCase(), JSON.stringify(data));
    cityName.innerHTML  = "<span style='color: teal'>Item successfuly added to Local Storage</span>";
}

//  GET DATA FROM LOCAL STORAGE

function getData() {
    try{
    const dataFromStorage = local.getItem(cityNameKey.value.toLowerCase());
    const dataInfo = JSON.parse(dataFromStorage);
    document.getElementById("city").innerHTML = dataInfo.city.toLowerCase();
    document.getElementById("tempr").innerHTML = dataInfo.tempreture;
    document.getElementById("windy").innerHTML = dataInfo.wind;
    document.getElementById("humidity").innerHTML = dataInfo.humid;
    document.getElementById('cityName').innerHTML = document.getElementById("cityInput").value.toLowerCase();
}
catch(err) {cityName.innerHTML = "<span style='color: crimson'>Error:</br> Local Storage has no data for this city</span>"}
}

// DELETE DATA FROM LOCAL STORAGE

function deleteData(){

    for (let i = 0, length = localStorage.length; i < length; i++) {
        const key = localStorage.key(i);
        if (cityNameKey.value.toLowerCase() == key) {
            localStorage.removeItem(key);
            console.log("Item successfuly removed from Local Storage");
            cityName.innerHTML  = "<span style='color: teal'>Item successfuly removed from Local Storage</span>";
        }
        else{
            console.log("Trying to remove an unexisting item...");
            cityName.innerHTML = "<span style='color: crimson'>Error:</br> Local Storage has no data for this city</span>"
        }
    }
}