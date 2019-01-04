var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var logSchema = new Schema({
	"id": String,
    "content": String
},{versionKey: false});

module.exports = mongoose.model('Log',logSchema,'log');