var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var purchasePaySchema = new Schema({
	"id": String,
    "date": String,
    "fittingsPay": [
        {
            "item": String,
            "cost": Number
        }
    ],
    "fittingsPayTotal": Number,
    "otherPay": [
        {
            "item": String,
            "cost": Number
        }
    ],
    "otherPayTotal": Number,
    "totalPay": Number
},{versionKey: false});

module.exports = mongoose.model('PurchasePay',purchasePaySchema,'purchasePay');