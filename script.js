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

    let 
}


api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}