var htmlparser = require("htmlparser2");
var _ = require('lodash');
var LikeParseError = require('../exceptions/LikeParseError');

module.exports = function(html) {
	var count;
	var countNext = false;
	// Finding is done in sync because KISS. 
	// Plus the app is not handling web reqs anyway so no perf degration.
	var parser = new htmlparser.Parser({
	    onopentag: function(name, attribs){
	    	//console.log(name);
	        if(name === "span" && attribs.class === "pluginCountTextDisconnected"){
	        	// Bingo, count is coming next
	            console.log("Count span found!");
	            countNext = true;
	        }
	    },
	    ontext: function(text){
	        if (countNext && !count) {
	        	console.log("Count is " + text + "?");
	        	count = text;
	        }
	    },
	    onclosetag: function(tagname){
	        
	    }
	}, {decodeEntities: true});
	parser.write(html);
	parser.end();

	return getNum(count);

}

function getNum(count) {

	// If its 0-999, it should just be convertable to int
	;
	if (count.indexOf('t') !== -1) {
		// Not 0-999
		// This means it should contain 't.' (indicating thousand)
		var parts = count.split('t');
		if (parts.length !== 2) {
			// We are out of luck, fuck this shit.
			throw new LikeParseError(count);
		}

		var numpart = parts[0];
		console.log("Numpart: " + numpart);
		var multiplier = 1000; // Multiplier assuming no comma

		// If numpart has comma, then it is something like '7,6' thousand likes.
		// Otherwise its smth like 76 thousand likes.
		if (numpart.indexOf(',') !== -1) {
			// Comma present, get rid of the comma
			numpart = _.replace(numpart, ',', '');
			// Set multiplier to be 100
			multiplier = 100;
		}
		// Trim
		numpart = _.trim(numpart);
		// Now it should be smth like 76
		// If there was comma, we multiply by 100, thus getting 7600
		// If there was no comma, multiply by 1000, thus getting 76 000
		return parseInt(numpart, 10) * multiplier;


	} else {
		return parseInt(count, 10);
	}
}