var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var storageSchema = new Schema({
	"id": String,
    "name": String,
    "date": String,
    "count": Number,
    "buyPrice": Number,
    "sellPrice": Number
},{versionKey: false});

module.exports = mongoose.model('Storage',storageSchema,'storage');