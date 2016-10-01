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
var parseNextFingerpori = require('./parsers/nextUrl');
// Gets the like count for this fingerpori 
var fetchLikes = require('./parsers')

/**
* Fetches one fingerpori from HS.fi (or from test location)
* @returns Promise to be filled with {date, url, count, nextFingerporiUrl}
*/
module.exports = function(url) {
	if (process.env.NODE_ENV === 'production') {
		return httpFetch(url);
	} else {
		return fileFetch();
	}

}

function fileFetch() {
	var currentFingerpori = nextFingerporiID;
	var filename = './testdata/' + nextFingerporiID + '.htmĺ';
	var fbFilename = './testdata/fb_' + nextFingerporiID + '.html';

	return new Promise(function(resolve, reject) {
		// Get the fake HS.fi html code
		fs.readFile(filename, 'utf8', function(err, contents) {
			if (err) return reject(err);
			// Set new id for next request into this test function
			nextFingerporiID = parseNextFingerporiID(contents);
			// Get the fake facebook html code
			fs.readFile(fbFilename, 'utf8', function(err, contents) {
				if (err) return reject(err);
				facebookLikes = fetchLikes(contents);
				resolve(currentFingerpori, facebookLikes);
			})
		})
	})
		

}