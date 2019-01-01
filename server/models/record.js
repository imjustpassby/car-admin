var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var recordSchema = new Schema({
	"id": String,
    "name": String,
    "phone": String,
    "point": Number,
    "date": String,
    "reward": String
},{versionKey: false});

module.exports = mongoose.model('Record',recordSchema,'record');