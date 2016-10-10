var htmlparser = require("htmlparser2");
var _ = require('lodash');

module.exports = function(html) {
	var picaddr;
	// Finding is done in sync because KISS. 
	// Plus the app is not handling web reqs anyway so no perf degration.
	var parser = new htmlparser.Parser({
	    onopentag: function(name, attribs){
	        if(name === "img"){
	        	var addr = attribs.src;
	        	if (addr.indexOf('sarjis') !== -1 && addr.indexOf('webkuva') !== -1) {
	        		// Found correct pic
	        		console.log("Pic found: " + addr);
	        		picaddr = addr;
	        	}
	        }
	    },
	    ontext: function(text){

	    },
	    onclosetag: function(tagname){
	        
	    }
	}, {decodeEntities: true});
	parser.write(html);
	parser.end();

	return picaddr;

}