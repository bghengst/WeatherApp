var ownKey = "f54881811ae9445900b1b062062864be";
var currentCity = "";
var lastCity = "";

var anError = (response) => {
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

var currentWeather = (event) => {
    let city = $('#search-city').val();
    currentCity = $("#search-city").val();

    let queryURL="api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ownKey;

    fetch(queryURL)
    .then(anError)
    .then(response) => {
        return response.json();
    })

    .then((response) => {

        saveCity(city);
        $('#search-error').text("");

        let currentWeatherIcon="api.openweathermap.org/data/2.5/weather?q=" + response.weather[0].icon + ".png";

        let currentTimeUTC = response.dt;
        let currentTimeZoneOffset=response.timezone;
        let currentTimeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
        let currentMoment = moment.unix(currentTimeUTC).utcOffset(currentTimeZoneOffsetHours);

        renderCities();

        getFiveDayForecast(event);

        $('#header-text').text(response.name);

        let currentWeatherHTML =
            <h3>${response.name} ${currentMoment.format("(MM/DD/YY)")}<img src="${currentWeatherIcon}"></h3>
            <ul class="list-unstyled">
                <li>Temperature: $(response.main.temp)&#8457;</li>
                <li>Humidity: ${response.main.humidity}%</li>
                <li>Wind Speed: ${response.wind.speed} mph</li>
                <li id="uvIndex">UV Index:</li>
            </ul>


    })

}


