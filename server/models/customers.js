var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var customersSchema = new Schema({
	"_id": String,
	"name": String,
	"phone": String,
	"plate": String,
	"brand": String,
	"date": String,
	"balance": Number,
	"point": Number
});

module.exports = mongoose.model('Customers',customersSchema);