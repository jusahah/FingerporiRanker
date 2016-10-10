var Promise = require('bluebird');
var _ = require('lodash');
var request = require('request');
var chalk = require('chalk');

/* TEST FETCHING STUFF/
// Can comment out for production
/* ---- */
var fs = require('fs');
// Parse related
var parsePicAddress = require('../parsers/parsePic');
// HS-related
var hsURLPrefix = 'http://www.hs.fi/fingerpori/';
var HsFailed = require('../exceptions/HsFailed');

module.exports = function(id) {
	return new Promise(function(resolve, reject) {
		// Get the real HS.fi code
		var url = hsURLPrefix + id;
		console.log(chalk.blue('HS PIC REQ'));
		request(
			{
				url: url, 
				headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
			},
			function(err, response, body) {
				if (!err && response.statusCode === 200) {
					// Body contains source code for fingerpori page
					var picAddress = parsePicAddress(body);	
					resolve(picAddress);

				} 

				else {
					reject(new HsFailed(url, response.statusCode));	
				}
			})



		
	})
	.catch(function() {
		console.log("Pic address fetch failed for " + id);
		return null; // Pic not fetched
	})

}
