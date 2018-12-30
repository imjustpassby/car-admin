var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var recordSchema = new Schema({
	"_id": String,
    "name": String,
    "phone": String,
    "point": Number,
    "date": String,
    "reward": String
});

module.exports = mongoose.model('Record',recordSchema,'record');