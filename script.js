var APIKey = "f54881811ae9445900b1b062062864be";
var city = "";
var currentDate = "";
var tempF = "";
var humidityValue = "";
var windSpeed = "";
var uvIndexValue = "";
var latitude = "";
var longitude = "";
var minTempK = "";
var maxTempK = "";
var minTempF = "";
var maxTempF = "";
var dayhumidity = "";
var currentWeatherIconCode = "";
var currentWeatherIconUrl = "";
var iconcode = "";
var iconurl = "";
var country = "";

var listOfSearchedCities = [];

var getSeachedCitiesFromLS = JSON.parse(localStorage.getItem("searched-cities"));
if (getSeachedCitiesFromLS !== null) {
  getSeachedCitiesFromLS.forEach(function(city) {city.toUpperCase();});
  listOfSearchedCities = getSeachedCitiesFromLS;  
}

$(document).ready(function(){
    displayCities(listOfSearchedCities);
    if (getSeachedCitiesFromLS !== null) {
      var lastCity = listOfSearchedCities[0];
      searchCity(lastCity);
    }
  });
            


  $("#search-btn").on("click", function() {
    event.preventDefault();
    clearDisplayedWeatherInfo()
    resetGlobalVariables()
    var cityName = $("input").val().toUpperCase().trim();
    $("#search-input").val("");
    searchCity(cityName);

    if (cityName !== ""&& listOfSearchedCities[0] !== cityName) {
        listOfSearchedCities.unshift(cityName);
        localStorage.setItem("searched-cities", JSON.stringify(listOfSearchedCities));
        if (listOfSearchedCities.length === 1) {
          $("#searched-cities-card").removeClass("hide");
        }
        
        console.log($("ul#searched-cities-list a").length);
        if ($("ul#searched-cities-list a").length >= 5) {
          ($("ul#searched-cities-list a:eq(4)").remove());
        }
        $("#searched-cities-list").prepend(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
        <li>${cityName}</li>
        </a>`);
      }
    });

        $(document).on("click", ".list-group-item", function() {
             var cityName = $(this).text();
            clearDisplayedWeatherInfo();
            resetGlobalVariables();
            searchCity(cityName);
    });

    function displayCurrentWeather() {
        var cardDiv = $("<div class='container border bg-light'>");
        var weatherImage = $("<img>").attr('src', currentWeatherIconUrl);
        var cardHeader = $("<h4>").text(city + " " + currentDate.toString());
        cardHeader.append(weatherImage);
        var temperatureEl = $("<p>").text("Temperature: " + tempF+ " ºF");
        var humidityEl = $("<p>").text("Humidity: " + humidityValue + "%");
        var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");
        var uvIndexEl = $("<p>").text("UV Index: ");
        // var uvIndexValueEl = $("<span>").text(uvIndexValue).css("background-color", getColorCodeForUVIndex(uvIndexValue)).addClass("text-white");
        var uvIndexValueEl = $("<span>").text(uvIndexValue).css("background-color", getColorCodeForUVIndex(uvIndexValue)); 
        uvIndexEl.append(uvIndexValueEl);
        cardDiv.append(cardHeader);
        cardDiv.append(temperatureEl);
        cardDiv.append(humidityEl);
        cardDiv.append(windSpeedEl);
        cardDiv.append(uvIndexEl);
        $("#current-weather-conditions").append(cardDiv);
      }

      function displayDayForeCast() { 
        var imgEl = $("<img>").attr("src", iconurl);  
        var cardEl = $("<div class='card'>").addClass("pl-1 bg-primary text-light");
        var cardBlockDiv = $("<div>").attr("class", "card-block");
        var cardTitleDiv = $("<div>").attr("class", "card-block");
        var cardTitleHeader = $("<h6>").text(dateValue).addClass("pt-2");
        var cardTextDiv = $("<div>").attr("class", "card-text");
        var minTempEl = $("<p>").text("Min Temp: " + minTempF + " ºF").css("font-size", "0.60rem");
        var maxTempEl = $("<p>").text("Max Temp: " + maxTempF + " ºF").css("font-size", "0.60rem");
        var humidityEl = $("<p>").text("Humidity: " + dayhumidity + "%").css("font-size", "0.60rem");
      
        cardTextDiv.append(imgEl);
        cardTextDiv.append(minTempEl);
        cardTextDiv.append(maxTempEl);
        cardTextDiv.append(humidityEl);
        cardTitleDiv.append(cardTitleHeader);
        cardBlockDiv.append(cardTitleDiv);
        cardBlockDiv.append(cardTextDiv);
        cardEl.append(cardBlockDiv);
        $(".card-deck").append(cardEl);
      }

      function addCardDeckHeader() {
        deckHeader = $("<h4>").text("5-Day Forecast").attr("id", "card-deck-title");
        deckHeader.addClass("pt-4 pt-2");
        $(".card-deck").before(deckHeader);
      }
      
      function clearDisplayedWeatherInfo() {
        $("#current-weather-conditions").empty();
        $("#card-deck-title").remove();
        $(".card-deck").empty();
      }
      
      function displayCities(citiesList) {
        $("#searched-cities-card").removeClass("hide");
        var count = 0;
        citiesList.length > 5 ? count = 5 : count = citiesList.length
        for (var i=0; i < count; i++) {
          $("#searched-cities-list").css("list-style-type", "none");
          $("#searched-cities-list").append(`<a href="#" class="list-group-item" style="text-decoration: none; color: black;">
          <li>${citiesList[i]}</li>
          </a>`);
        }
      }

      function getColorCodeForUVIndex(uvIndex) {
        var uvIndexValue = parseFloat(uvIndex);
        var colorcode = "";
        if (uvIndexValue <= 2) {
          colorcode = "#00ff00";
        }
        else if ((uvIndexValue > 2) && (uvIndexValue <= 5)) {
          colorcode = "#ffff00";
        }
        else if ((uvIndexValue > 5) && (uvIndexValue <= 7)) {
          colorcode = "#ffa500";
        }
        else if ((uvIndexValue > 7) && (uvIndexValue <= 10)) {
          colorcode = "#9e1a1a";
        }
        else if (uvIndexValue > 10) {
          colorcode = "#7f00ff";
        }
        return colorcode;
      }

      function resetGlobalVariables() {
        city = "";
        currentDate = "";
        tempF = "";
        humidityValue = "";
        windSpeed = "";
        uvIndexValue = "";
        latitude = "";
        longitude = "";
        minTempK = "";
        maxTempK = "";
        minTempF = "";
        maxTempF = "";
        dayhumidity = "";
        currentWeatherIconCode = "";
        currentWeatherIconUrl = "";
        iconcode = "";
        iconurl = "";
        country = "";
      }

      
    } else {
        let lastCityKey="cities"+(localStorage.length-1);
        lastCity=localStorage.getItem(lastCityKey);
        $('#search-city').attr("value", lastCity);

        for (let i = 0; i < localStorage.length; i++){
            let city = localStorage.getItem("cities" + i);
            let cityEl;

            if (currentCity===""){
                currentCity=lastCity;
            }

            if (city === currentCity){
                cityEl = '<button type="button" class="list-group-item-action active">${city}</button></li>' ;

            } else {
                cityEl ='<button type="button" class="list-group-item list-group-item-action">${city}</button></li>' ;
            }

            $('#city-results').prepend(cityEl);
        }

        if (localStorage.length>0){
            $('#clear-storage').html($('<a id ="clear-storage" href="#">clear</a>'));
        }
            else{
                $('#clear-storage').html('');
            }

    }
}

    $('#search-button').on("click", (event) => {
        event.preventDefault();
        currentCity = $('#search-city').val();
        getCurrentConditions(event);
    })

$('#city-results').on("click", (event)  {
    event.preventDefault();
    $('#search-city').val(event.target.textContent);
    currentCity=$('#search-city').val();
    getCurrentConditions(event);
})

$("#clear-storage").on("click", (event) {
    localStorage.clear();
    renderCities();
})

renderCities();

getCurrentConditions();