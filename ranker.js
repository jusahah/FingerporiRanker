var _ = require('lodash');
var fs = require('fs-extra');
var jsonfile = require('jsonfile');
// Files to work with
var file = './fingerpori_cartoons.json';
var outputFile = './fingerpori_cartoons_ranked.json';

var cartoonsObj = jsonfile.readFileSync(file);
var cartoonsList = cartoonsObj.list;

// Sort it
var cartoonsList = _.orderBy(cartoonsList, ['likes'], ['desc']);
// Write to output file
jsonfile.writeFileSync(outputFile, {list: cartoonsList}, {spaces: 2});