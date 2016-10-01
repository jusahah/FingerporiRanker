var Promise = require('bluebird');
var _ = require('lodash');
var request = require('request');

/* TEST FETCHING STUFF/
// Can comment out for production
/* ---- */
var fs = require('fs');
var nextFingerporiID = 's1306076646582';
/* ---- */

/* REAL FETCHING STUFF*/
// Can comment out when in local dev
/* ----- */
var facebookURLPrefix = 'https://www.facebook.com/plugins/like.php?action=recommend&app_id=188500207846299&channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FP5DLcu0KGJB.js%3Fversion%3D42%23cb%3Dfaa9cb767580d4%26domain%3Dwww.hs.fi%26origin%3Dhttp%253A%252F%252Fwww.hs.fi%252Ff283dc71c6358bc%26relation%3Dparent.parent&layout=button_count&container_width=0&href=http%3A%2F%2Fwww.hs.fi%2Ffingerpori%2F';
var hsURLPrefix = 'http://www.hs.fi/fingerpori/';
var HsFailed = require('./exceptions/HsFailed');
var FbFailed = require('./exceptions/FbFailed');
/* ----- */

/* Fetching deps */
// Gets the URL to send next request for the next fingerpori
var parseNextFingerpori = require('./parsers/parseNextFingerporiID');
// Gets the date of current fingerpori
var parseFingerporiDate = require('./parsers/parseDate');
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
			var currentFingerporiDate = parseFingerporiDate(contents);
			console.log("NEXT ID: " + nextFingerporiID);
			// Get the fake facebook html code
			fs.readFile(fbFilename, 'utf8', function(err, contents) {
				if (err) return reject(err);
				facebookLikes = fetchLikes(contents);
				resolve({
					id: currentFingerpori, 
					likes: facebookLikes,
					date: currentFingerporiDate
				});
			})
		})
	})
		
}

function httpFetch(id) {

	return new Promise(function(resolve, reject) {
		// Get the real HS.fi code
		var url = hsURLPrefix + id;
		var fbUrl = facebookURLPrefix + id;

		request(url, function(err, response, body) {
			if (!err && response.statusCode === 200) {
				// Body contains source code for fingerpori page
				var nextFingerporiID = parseNextFingerpori(body);
				var currentFingerporiDate = parseFingerporiDate(body);	

				request(fbUrl, function(err, response, body) {
					if (!err && response.statusCode === 200) {	
						facebookLikes = fetchLikes(body);
						resolve({
							id: id, 
							nextId: nextFingerporiID,
							likes: facebookLikes,
							date: currentFingerporiDate
						});						
					} 

					else {
						reject(new FbFailed());
					}
				})

			} 

			else {
				reject(new HsFailed());	
			}
		})



		
	})

}