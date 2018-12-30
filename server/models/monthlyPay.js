var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var monthlyPaySchema = new Schema({
  "_id": String,
  "date": String,
  "basePay": [{
    "item": String,
    "cost": Number,
    "key": Number
  }],
  "basePayTotal": Number,
  "salaryPay": [{
    "item": String,
    "cost": Number,
    "key": Number
  }],
  "salaryPayTotal": Number,
  "otherPay": [{
    "item": String,
    "cost": Number,
    "key": String
  }],
  "otherPayTotal": Number,
  "totalPay": Number
});

module.exports = mongoose.model('MonthlyPay', monthlyPaySchema,'monthlyPay');
