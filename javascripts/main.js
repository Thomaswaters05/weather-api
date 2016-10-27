"use strict";

let apiKeys = {};

let weatherList = (searchText) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: 'apiKeys.json'
    }).then((response) => {
      apiKeys = response;
      let authHeader = apiKeys.key;
      $.ajax({
        method: 'GET',
        // headers:{
        //   'Authorization': authHeader --> certain API's use this, while others do NOT
        // },
        url: `http://api.openweathermap.org/data/2.5/forecast/weather?zip=${searchText}&units=imperial&APPID=${authHeader}`

      }).then((response2)=>{
        console.log(response2);
        resolve(response2);
      }, (errorResponse2) => {
        reject(errorResponse2);
      });
    }, (errorResponse) =>{
      reject(errorResponse);
    });
  });
};


//logic for the DOM//
$(document).ready(function() {
  $('#clicky-button').on('click', ()=>{
  $('#clicky-button').button('loading');
  $('output').html("");
    let searchy = $('#weather-search').val();
      console.log("its working", searchy);
      weatherList(searchy).then((dataFromApi)=>{
        $('#clicky-button').button("reset");
        console.log("data",dataFromApi);
        $('#output').append(`<div id="weather_info"> City: ${dataFromApi.city.name}</div>`);
        $('#output').append(`<div id="weather_info"> Country: ${dataFromApi.city.country}</div>`);
        $('#output').append(`<div id="weather_info"> Current Condition: ${dataFromApi.list[0].weather[0].description}</div>`);
        $('#output').append(`<div id="weather_info"> Curent Wind Speed: ${dataFromApi.list[0].wind.speed}</div>`);
        $('#output').append(`<div id="weather_info"> Curent Temperature: ${dataFromApi.list[0].main.temp}</div>`);

  });
 });
});

