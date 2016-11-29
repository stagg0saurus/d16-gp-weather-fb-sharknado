"use strict";


/* ------ API CALLS ------ */

let dom = require('./dom-handler'); 


function getWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&APPID=c10648665493f00d731df750ee9b0436`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}


function getThreeDayWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&cnt=3&APPID=c10648665493f00d731df750ee9b0436`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}


function getSevenDayWeather(zipcode){
	return new Promise((resolve, reject) => {
		$.ajax({
			url:`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipcode}&cnt=7&APPID=c10648665493f00d731df750ee9b0436`,
			dataType: "json"
		}).done(function(data) {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
}



/* ------ VALIDATE ZIP & BUILD WEATHER  ------ */

function runWeather(){
	var zipCode = document.getElementById("zipCode").value;
	var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);

	if (isValidZip){
		console.log("Yeah, that's valid. Move along now.");
		getWeather(zipCode)
		.then((data) =>{
			dom.buildWeather(data, zipCode);
		});

	} else {
		console.log("Woah there, we need a valid zip code.");
	}
}



function threeDay(zipCode){
	var threeDay = document.getElementById("threeDayView");
	threeDay.addEventListener("click", function(){
		getThreeDayWeather(zipCode)
		.then((data) =>{
			dom.prettyWeather(data, zipCode, 3);
			});
	});
}


function sevenDay(zipCode){
	var sevenDay = document.getElementById("sevenDayView");

	sevenDay.addEventListener("click", function(){
		getSevenDayWeather(zipCode)
		.then((data) =>{
			dom.prettyWeather(data, zipCode, 7);
		});
	});
}

module.exports = {
	threeDay, 
	sevenDay,
	runWeather,
	getSevenDayWeather,
	getThreeDayWeather,
	getWeather
};





