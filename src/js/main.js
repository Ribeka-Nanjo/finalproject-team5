var newName1 = document.getElementById("cityInput");
var cityName = document.getElementById("cityName");
function WeatherUserInfo() {
    var newName = document.getElementById("cityInput");
// console.log(newName)

    // CURRENT WEATHER 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+newName.value+`&units=metric&APPID=93022b80d2fa47743474256c2ea49a47`)
    .then(response => response.json())
    .then(current => {
        document.getElementById('currentImg').setAttribute('src', "https://openweathermap.org/img/w/" + current.weather[0].icon + ".png");
        document.getElementById('current').value = current.weather[0].description;
        document.getElementById('temp').value = current.main.temp + " °C";
        document.getElementById('wind').value = current.wind.speed + ' m/s';
        document.getElementById('humid').value = current.main.humidity + ' &percnt;';
        // console.log(current)
    })

    // FORECAST
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&units=metric&APPID=93022b80d2fa47743474256c2ea49a47')
    .then(response => response.json())
    .then(data => {
    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Temp").innerHTML = Number(data.list[i].main.temp).toFixed(1)+ " °C";
    }
     for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    // console.log(data)


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


//Saving Data

// const  = document.getElementById('currentImg').setAttribute('src', "https://openweathermap.org/img/w/" + current.weather[0].icon + ".png");
// const fname = document.getElementById("fname");
// const lname = document.getElementById("lname");
// const city = document.getElementById('cityName');
const current = document.getElementById('current');
const temp = document.getElementById('temp');
const wind = document.getElementById('wind');
const humid = document.getElementById('humid'); 

const local = localStorage

function saveData(){

    let data = {
        // "firstName": fname.value,
        // "lastName": lname.value,
        "city": newName.value,
        "tempreture": temp.value,
        "wind": wind.value,
        "humid": humid.value
    }

    local.setItem(newName1.value, JSON.stringify(data));
}

// const getItem = document.getElementById("getName");

function getData(){
    const dataFromStorage = local.getItem(newName1.value);
    const dataInfo = JSON.parse(dataFromStorage);
    document.getElementById("city").innerHTML = dataInfo.city;
    document.getElementById("tempr").innerHTML = dataInfo.tempreture;
    document.getElementById("windy").innerHTML = dataInfo.wind;
    document.getElementById("humidity").innerHTML = dataInfo.humid;    
}

function deleteData(){
    const dataFromStorage = local.getItem(newName.value);
    const dataInfo = JSON.parse(dataFromStorage);
    


    for (i = 0; i < dataInfo.length; i++){
        document.getElementById("del").innerHTML = dataInfo
        if (newName == dataInfo[i]){
            dataInfo.removeItem()
        }else {
            console.log("Item not found...")
        }
    }
}
