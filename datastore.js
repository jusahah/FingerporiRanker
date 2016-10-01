var _ = require('lodash');
var moment = require('moment');
var jsonfile = require('jsonfile');
var file = './fingerpori_db.json';

var fingerporisInMem = [];

module.exports = function(dataObj) {
	var isoDate = moment(dataObj.date, 'D.M.YYYY').format();
	fingerporisInMem.push({
		date: isoDate,
		datestring: dataObj.date,
		id: dataObj.id,
		likes: dataObj.likes
	});

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


}