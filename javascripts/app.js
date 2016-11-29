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
			buildWeather(data, zipCode);
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
			prettyWeather(data, zipCode, 3);
			});
	});
}


function sevenDay(zipCode){
	var sevenDay = document.getElementById("sevenDayView");

	sevenDay.addEventListener("click", function(){
		getSevenDayWeather(zipCode)
		.then((data) =>{
			prettyWeather(data, zipCode, 7);
		});
	});
}

function buildWeather(data, zipCode){
	var output = document.getElementById("single-day-view");
	var fahrenheit = convertTemp(data.main.temp);

	output.innerHTML += 
	`<br><br><br>
	 Current city: ${data.name}.<br>
	 The temperature is ${fahrenheit}&deg; F. <br>
	 The conditions are ${data.weather[0].main}.<br>
	 The wind speed is ${data.wind.speed} mph. <br>
	 The air pressure is ${data.main.pressure}.<br><br>

	 <a href="#" id="threeDayView">View 3 Day, yo.</a>
	 `;

	 //pass zip code in
	 threeDay(zipCode);
}


/* ------ MULTI DAY VIEW ------ */

function prettyWeather(data, zipCode, counter){
	var output = document.getElementById("seven-day-view");
	
	console.log("buildSevenDay data", data);

	for (var i = 0; i < counter; i++){

		let dayTemp = convertTemp(data.list[i].temp.day);
		let nightTemp = convertTemp(data.list[i].temp.night);

		output.innerHTML +=
		`${data.list[i].weather[0].main}<br>
		 High of ${dayTemp}&deg; F.<br>
		 Low of ${nightTemp}&deg; F.<br>
		--------------------------------<br>`;		
		}

		if(counter ===3){
			output.innerHTML +=
			` <a href="#" id="sevenDayView">View 7 Days, yo.</a><br><br>`;
			sevenDay(zipCode);
	}
}


/* ----- SOME NERDY MATH STUFF ------ */


function convertTemp(kelvin) {
	return (((kelvin - 273.15) * 9/5) + 32).toFixed(0);
}


/* -----  EVENT LISTENERS  ----- */

	var zipCode = document.getElementById("zipCode");
zipCode.addEventListener("keydown", function(event){
	if(event.keyCode === 13) {
		runWeather();
	}
});

var submitBtn = document.getElementById("submitZip");
submitBtn.addEventListener("click", runWeather);








