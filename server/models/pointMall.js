var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var pointMallSchema = new Schema({
	"id": String,
    "type": String,
    "name": String,
    "point": Number,
    "originalPoint": Number,
    "edit": Boolean
},{versionKey: false});

module.exports = mongoose.model('PointMall',pointMallSchema,'pointMall');