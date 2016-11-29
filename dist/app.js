(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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






},{"./dom-handler":2}],2:[function(require,module,exports){
"use strict";


/* ------ SINGLE DAY VIEW ------ */

let app = require('./app.js');
console.log('app', app);




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
	 app.threeDay(zipCode);
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
			app.sevenDay(zipCode);
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
		// app.runWeather();
	}
});

var submitBtn = document.getElementById("submitZip");
submitBtn.addEventListener("click", app.runWeather);



module.exports = {
	prettyWeather,
	buildWeather

};


},{"./app.js":1}],3:[function(require,module,exports){
"use strict";

let 
	// fbGetter = require('./fb-getter'), 
	// fbConfig = require('./fbConfig'), 
	// user = require('./user'), 
	app = require('./app'); 

	var zipCode = document.getElementById("zipCode");
zipCode.addEventListener("keydown", function(event){
	if(event.keyCode === 13) {
		app.runWeather();
	}
});

var submitBtn = document.getElementById("submitZip");
submitBtn.addEventListener("click", app.runWeather);




},{"./app":1}]},{},[3]);
