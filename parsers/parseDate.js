var htmlparser = require("htmlparser2");
var _ = require('lodash');

module.exports = function(html) {
	var next = false;
	var date;
	// Finding is done in sync because KISS. 
	// Plus the app is not handling web reqs anyway so no perf degration.
	var parser = new htmlparser.Parser({
	    onopentag: function(name, attribs){
	        if(name === "div" && attribs.class === "comic-date"){
	        	next = true;
	        }
	    },
	    ontext: function(text){
	    	if (next && !date) {
	    		date = text;
	    	}

	    },
	    onclosetag: function(tagname){
	        
	    }
	}, {decodeEntities: true});
	parser.write(html);
	parser.end();

	return date;

}