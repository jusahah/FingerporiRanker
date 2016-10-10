var _ = require('lodash');
var fs = require('fs-extra');
var Promise = require('bluebird');
var jsonfile = require('jsonfile');
// Files to work with
var file = '../fingerpori_cartoons_ranked.json';
var outputFile = '../fingerpori_cartoons_ranked_pics.json';

var fetchPic = require('./fetchPic');

// How many to generate with?
var amount = 10;

var cartoonObj = jsonfile.readFileSync(file);
var cartoons   = _.take(cartoonObj.list, amount);

// Fetch the pics
Promise.mapSeries(cartoons, function(cartoon) {
	return fetchPic(cartoon.id).then(function(picaddr) {
		console.log("Pic address received in index: " + picaddr);
		return _.assign({}, cartoon, {pic: picaddr});
	})
	.delay(2500 + Math.random(1000));
})
.then(function(cartoonsWithPics) {
	console.log(cartoonsWithPics)
	jsonfile.writeFileSync(outputFile, {list: cartoonsWithPics}, {spaces: 2});
});

