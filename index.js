var dataSave = require('./datastore');
var fetchSingle  = require('./countFetch');
var Promise = require('bluebird');
var moment = require('moment');
var chalk = require('chalk');

var lastID;

function singleFetch(id) {
	console.log("New fetch starting")
	return fetchSingle(id).tap(function(infoObj) {
		console.log(chalk.yellow(JSON.stringify(infoObj)));
	});	
}

function loop(nextId) {
	lastID = nextId;
	console.log(chalk.bgGreen.bold('Next up: ' + nextId));
	return singleFetch(nextId).tap(function(responseObj) {
		dataSave(responseObj); // Sync call
	})
	.delay(4000 + Math.random()*500) // Wait a sec or ten before next loop run
	.then(function(responseObj) {
		return loop(responseObj.nextId);
	})



}
var cmdArgs = process.argv.slice(2);

// Kick off the scraping!
// loop recurses by itself until no more fingerporis left. Then it'll throw up.
loop(cmdArgs[0])
.catch(function() {
	console.log("ERROR CAUGHT!!!");
})
.delay(20000)
.then(function() {
	console.log("Retrying...!!!");
	return loop(lastID);
})
// We should probably catch specific exceptions but nah.











