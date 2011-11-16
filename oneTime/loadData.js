(function(){
	var mongoose = require('mongoose');
	var Document = require('../models.js').Document(db);
	var db = mongoose.connect('mongodb://localhost/poblio-development');

	console.log('working01');
	var populateDocument = (function() {
		var bookData01 = {
		title: "Tale of Two Cities",
		price: 33.30,
		data: "no spam call 555-3853 ask for Archie"
		};
		console.log('working02');
		var taleDocument = new Document(bookData01);
		return taleDocument.save(function(err, item) {
			if(err) {
				return console.log(err);
			} else {
				return console.log(item);
			}
		});
	})();
}).call(this);