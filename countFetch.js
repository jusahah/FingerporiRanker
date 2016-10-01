var Promise = require('bluebird');
var _ = require('lodash');
var request = require('request');

/* TEST FETCHING DEPS & VARS*/
/* ---- */
var fs = require('fs');
var nextFingerporiID = 's1306076646582';
/* ---- */

/* Fetching deps */
// Gets the URL to send next request for the next fingerpori
var parseNextFingerpori = require('./parsers/parseNextFingerporiID');
// Gets the like count for this fingerpori 
var fetchLikes = require('./parsers/fetchLikes')

/**
* Fetches one fingerpori from HS.fi (or from test location)
* @returns Promise to be filled with {date, url, count, nextFingerporiUrl}
*/
module.exports = function(url) {
	if (process.env.NODE_ENV === 'production2') {
		return httpFetch(url);
	} else {
		console.log("TEST ENV!");
		return fileFetch();
	}

}

function fileFetch() {
	var currentFingerpori = nextFingerporiID;
	var filename = './testdata/' + nextFingerporiID + '.html';
	var fbFilename = './testdata/fb_' + nextFingerporiID + '.html';

	return new Promise(function(resolve, reject) {
		// Get the fake HS.fi html code
		console.log("Reading file for: " + currentFingerpori);
		fs.readFile(filename, 'utf8', function(err, contents) {
			if (err) return reject(err);
			// Set new id for next request into this test function
			nextFingerporiID = parseNextFingerpori(contents);
			console.log("NEXT ID: " + nextFingerporiID);
			// Get the fake facebook html code
			fs.readFile(fbFilename, 'utf8', function(err, contents) {
				if (err) return reject(err);
				facebookLikes = fetchLikes(contents);
				resolve({id: currentFingerpori, likes: facebookLikes});
			})
		})
	})
		

}