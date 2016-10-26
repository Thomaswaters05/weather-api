"use strict";

let apiKeys = {};

let imageList = (searchText) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'GET',
      url: 'apiKeys.json'
    }).then((response) => {
      apiKeys = response;
      let authHeader = 'Client-ID ' + apiKeys.client_id;
      $.ajax({
        method: 'GET',
        headers:{
          'Authorization': authHeader
        },
        url: ` https://api.imgur.com/3/gallery/t/${searchText}`
      }).then((response2)=>{
        resolve(response2.data.items);
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
    let searchy = $('#imgur-search').val();
    console.log("its working", searchy);
    imageList(searchy).then((dataFromImgur)=>{
      $('#clicky-button').button("reset");
      console.log('dataFromImgur', dataFromImgur);
      dataFromImgur.forEach((image) =>{
      $('#output').append(`<img src="${image.link}">`);
    });
  });
 });
});

