var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var staffSchema = new Schema({
    "_id": String,
    "date": String,
    "name": String,
    "sex": String,
    "phone": String,
    "position": String,
    "address": String,
    "baseSalary": Number,
    "welfare": Number,
    "extra": Number,
    "total": Number
});

module.exports = mongoose.model('Staff',staffSchema,'staff');