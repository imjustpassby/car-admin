var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var customersSchema = new Schema({
	"id": String,
	"name": String,
	"phone": String,
	"plate": String,
	"brand": String,
	"date": String,
	"balance": Number,
	"point": Number
},{versionKey: false});

module.exports = mongoose.model('Customers',customersSchema);