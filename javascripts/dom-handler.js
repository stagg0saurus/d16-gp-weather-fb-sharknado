"use strict";

let user = require("./user");

$("#auth-btn").click(function() {
  console.log('clicked auth'); 
  user.logInGoogle()
    .then(function(result) {
    let user = result.user;
    console.log('logged in user', user.uid);
    $("#auth-btn").addClass("is-hidden"); 
    $("#logout").removeClass('is-hidden'); 
  
  });
});


$("#logout").click(function() {
  user.logOut()
  .then(function() {
  
    $("#logout").addClass('is-hidden'); 
    $("#auth-btn").removeClass("is-hidden"); 
  });
});
console.log('cool');