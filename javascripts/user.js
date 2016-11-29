"use strict";

let firebase = require("./fbConfig");
	let provider = new firebase.auth.GoogleAuthProvider(); 
	let currentUser = null; 

firebase.auth().onAuthStateChanged(function(user) {
	if(user) {
		currentUser = user.uid;
		console.log("currentUserLoggedIn?",currentUser);
	} else {
		currentUser = null; 
		console.log("currentUserLoggedOut?",currentUser);
	}
});



function logInGoogle() {
	console.log('whats up auth'); 
	return firebase.auth().signInWithPopup(provider);

}

function logOut() {
	return firebase.auth().signOut();
}

function getUser() {
	return currentUser;
}
module.exports = {
	logInGoogle, 
	logOut, 
	getUser};