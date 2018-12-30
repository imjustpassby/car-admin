var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var storageSchema = new Schema({
	"_id": String,
    "name": String,
    "date": String,
    "count": Number,
    "buyPrice": Number,
    "sellPrice": Number
});

module.exports = mongoose.model('Storage',storageSchema,'storage');