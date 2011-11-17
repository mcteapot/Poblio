(function(){
	var mongoose = require('mongoose');
	var Document = require('../models.js').Document(db);
	var db = mongoose.connect('mongodb://localhost/poblio-development');

	console.log('working01');
	var populateDocument = (function() {
		var bookData01 = {
		title: "Hamlet",
		price: 2.00,
		data: "Hotties welcome, 555-2833 call Justain."
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