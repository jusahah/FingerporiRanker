var htmlparser = require("htmlparser2");
var _ = require('lodash');

module.exports = function(html) {
	var next;
	// Finding is done in sync because KISS. 
	// Plus the app is not handling web reqs anyway so no perf degration.
	var parser = new htmlparser.Parser({
	    onopentag: function(name, attribs){
	        if(name === "a" && attribs.class === "prev-cm "){
	        	console.log("prev-cm found");
	        	next = _.last(attribs.href.split("/"));
	        }
	    },
	    ontext: function(text){

	    },
	    onclosetag: function(tagname){
	        
	    }
	}, {decodeEntities: true});
	parser.write(html);
	parser.end();

	return next;

}