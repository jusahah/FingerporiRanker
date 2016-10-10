var _ = require('lodash');
var moment = require('moment');
var fs = require('fs-extra');
var jsonfile = require('jsonfile');
var file = './fingerpori_db.json';

var fingerporisInMem = [];

var lastBackup = 0;

module.exports = function(dataObj) {
	var isoDate = moment(dataObj.date, 'D.M.YYYY').format();
	fingerporisInMem.push({
		date: isoDate,
		datestring: dataObj.date,
		id: dataObj.id,
		likes: dataObj.likes
	});

	// Sort again
	// Probably wildly wasteful to force full resorting but we ain't caring.
	//fingerporisInMem = _.orderBy(fingerporisInMem, ['likes'], ['desc']);

	// Push to file
	// Do it sync for KISS, no perf degration anyway
	// as we don't accept client requests.

	jsonfile.writeFileSync(file, {
		lastUpdate: isoDate,
		lastItemPushed: {
			id: dataObj.id,
			date: dataObj.date
		},
		list: fingerporisInMem
	}, {spaces: 2});

	if ((lastBackup + 120 * 1000) < Date.now()) {
		lastBackup = Date.now();
		backup();
	}

}

function backup() {

	var copyfile = './b_' + Date.now() + '.json';
	fs.copySync(file, copyfile);


}