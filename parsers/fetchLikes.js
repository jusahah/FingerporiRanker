var htmlparser = require("htmlparser2");

module.exports = function(html) {
	var count;
	var countNext = false;
	// Finding is done in sync because KISS. 
	// Plus the app is not handling web reqs anyway so no perf degration.
	var parser = new htmlparser.Parser({
	    onopentag: function(name, attribs){
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

	return count;

}