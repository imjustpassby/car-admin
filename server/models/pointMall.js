var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var pointMallSchema = new Schema({
	"_id": String,
    "type": String,
    "name": String,
    "point": Number,
    "originalPoint": Number,
    "edit": Boolean
});

module.exports = mongoose.model('PointMall',pointMallSchema,'pointMall');