var forecastList = document.querySelector("#five-forecast");
//var searches = {};
function getWeather() {
    //var searchEl = window.prompt("Enter a location");
    
    var searchEl = document.querySelector("#searchTerm").value;
    var apiUrlCoords = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchEl + "&appid=5671c5801e2bfedc8ae3f4c13a5bb27d"
    fetch(apiUrlCoords)
    .then(function(response) {
        return response.json();
    })
    .then(function(cod) {
        console.log(cod);
        var latEl = cod.city.coord.lat;
        console.log(latEl);
        var lonEl = cod.city.coord.lon;
        console.log(lonEl);
        
        disPlaceDate(cod);
        
        var units = "&units=imperial";

        var apiUrlWeather = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEl + "&lon=" + lonEl + units + "&appid=5671c5801e2bfedc8ae3f4c13a5bb27d"
        fetch(apiUrlWeather)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            disInfo(response);
            fiveForecast(response);
        })
    })
};
var disPlaceDate = function(cod) {
    var currentDate = moment().format("L");
    console.log("City = " + cod.city.name + ", Date = " + currentDate);

    var placeEl = document.querySelector("#place");
    placeEl.textContent = cod.city.name;
    var dateEl = document.querySelector("#date");
    dateEl.textContent = "(" + currentDate + ")";
};
var disInfo = function(info) {
    var curTemp = document.querySelector("#main-temp");
    curTemp.textContent = info.current.temp + "°F";
    var curWind = document.querySelector("#main-wind");
    curWind.textContent = info.current.wind_speed + " MPH";
    var curHumid = document.querySelector("#main-humid");
    curHumid.textContent = info.current.humidity + "%";
    var curUvi = document.querySelector("#main-uvi");
    curUvi.textContent = info.current.uvi;
    if ((info.current.uvi >= 0)&&(info.current.uvi < 3)) {
        $("#main-uvi").addClass("uvi-low");
    }
    else if ((info.current.uvi >= 3)&&(info.current.uvi < 6)) {
        $("#main-uvi").addClass("uvi-moderate");
    }
    else if ((info.current.uvi >= 6)&&(info.current.uvi < 8)) {
        $("#main-uvi").addClass("uvi-high");
    }
    else if ((info.current.uvi >= 8)&&(info.current.uvi < 11)) {
        $("#main-uvi").addClass("uvi-very-high");
    }
    else if (info.current.uvi >= 11) {
        $("#main-uvi").addClass("uvi-extreme");
    }
    else {
        window.alert ("UVI: UNKNOWN");
        console.log("UVI: UNKNOWN");
    }
};
var fiveForecast = function(days) {
    for(var i = 1; i < days.daily.length - 2; i++) {
        var date = moment();
        
        var foreCard = document.createElement("ul");
        foreCard.classList = "card bg-dark forecast-style text-white";

        var foreDateCon = document.createElement("li");
        foreCard.appendChild(foreDateCon);
        
        var foreDate = document.createElement("h2");
        foreDate.textContent = date.add(i, "days").format("MM/DD/YYYY");
        foreDateCon.appendChild(foreDate);
        
        console.log("Temp = " + days.daily[i].temp.day + "°F");
        var foreTemp = document.createElement("li");
        foreTemp.textContent = "Temp: " + days.daily[i].temp.day + "°F";
        foreCard.appendChild(foreTemp);
        
        console.log("Wind = " + days.daily[i].wind_speed + " MPH");
        var foreWind = document.createElement("li");
        foreWind.textContent = "Wind: " + days.daily[i].wind_speed + " MPH";
        foreCard.appendChild(foreWind);
        
        console.log("Humidity = " + days.daily[i].humidity + "%");
        var foreHumid = document.createElement("li");
        foreHumid.textContent = "Humidity: " + days.daily[i].humidity + "%";
        foreCard.appendChild(foreHumid);

        forecastList.appendChild(foreCard);
    }
    
};
//var load = function() {
//    searches = JSON.parse(localStorage.getItem("searches"));
//    var prevSearch = document.createElement("button");
//    prevSearch.textContent = searches;

//};
//var save = function() {
//    localStorage.setItem("searches", JSON.stringify());
//};

