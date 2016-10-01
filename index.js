var fingerporiDB = require('./datastore');
var fetchSingle  = require('./countFetch');
var Promise = require('bluebird');

function singleFetch() {
	console.log("New fetch starting")
	return fetchSingle().then(function(infoObj) {
		console.log("fetch done!");
		console.log(infoObj);
	}).delay(1000);	
}

function loop() {
	return singleFetch().then(loop);
}

loop()
.catch(function(e) {
	console.log("All parsed");
});





