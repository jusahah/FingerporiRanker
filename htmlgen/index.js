var _ = require('lodash');
var fs = require('fs-extra');
var Promise = require('bluebird');
var jsonfile = require('jsonfile');

// Image conversion

// Files to work with
var file = '../fingerpori_cartoons_ranked.json';
var outputFile = '../fingerpori_cartoons_ranked_pics.json';
var htmlFile = './index.html';

var fetchPic = require('./fetchPic');

// How many to generate with?
var amount = 100;

var cartoonObj = jsonfile.readFileSync(file);
var cartoons   = _.take(cartoonObj.list, amount);

// Fetch the pics
Promise.mapSeries(cartoons, function(cartoon) {
	return fetchPic(cartoon.id).then(function(basestring) {
		console.log(_.truncate(basestring, 20));
		return _.assign({}, cartoon, {pic: basestring});
	})
	.delay(2500 + Math.random(1500));
})
.tap(function(cartoonsWithPics) {
	
	jsonfile.writeFileSync(outputFile, {list: cartoonsWithPics}, {spaces: 2});
})
.then(function(cartoonsWithPics) {
	// Generate web page
	var html = '<br><h1>Top 100 fingerpori cartoons (by FB likes)</h1>';
	html += '<p>From December 2012 to October 2016</p>';
	html += '<br>';

	_.each(cartoonsWithPics, function(cartoon) {
		html += '<div>';
		html += '<h3>' + cartoon.datestring + '</h3>';
		html += '<p>' + "Facebook likes (hs.fi): " + cartoon.likes + '</p>';
		html += '<img src="data:image/png;base64,' + cartoon.pic + '" />';
		html += '</div>';
		html += '<hr>';		

	});

	fs.writeFileSync(htmlFile, html);
});

