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



