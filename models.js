
/**
 * Module Dependencies
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Schema definition
 */
 
var Document = new Schema({
		'title'		: { type: String, index: true }
	,	'price'		: Number
	,	'data'		: String
	,	'date'		: { type: Date, default: Date.now }

});

/**
 * Define model.
 */
 /*
Document.virtual('id')
.get(function() {
  return this._id.toHexString();
});
*/
//mongoose.model('Document', Document);
//exports.Document = function(db) { return db.model('Document'); };


exports.Document = function(db) { return mongoose.model('Document', Document); };