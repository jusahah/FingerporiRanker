var dataSave = require('./datastore');
var fetchSingle  = require('./countFetch');
var Promise = require('bluebird');
var moment = require('moment');
var chalk = require('chalk');

function singleFetch(id) {
	console.log("New fetch starting")
	return fetchSingle(id).tap(function(infoObj) {
		console.log(chalk.yellow(JSON.stringify(infoObj)));
	});	
}

function loop(nextId) {
	console.log(chalk.bgGreen.bold('Next up: ' + nextId));
	return singleFetch(nextId).tap(function(responseObj) {
		dataSave(responseObj); // Sync call
	})
	.delay(1500 + Math.random()*2500) // Wait a sec before next loop run
	.then(function(responseObj) {
		return loop(responseObj.nextId);
	})

}

loop('s1306076646582')
// We should probably catch specific exceptions but nah.
.catch(function(e) {
	console.log("All parsed?");
});









