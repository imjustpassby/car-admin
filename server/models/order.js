var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  "id": String,
  "orderType": String,
  "cusInfo": [{
    "name": String,
    "phone": String,
    "plate": String,
    "brand": String,
    "date": String,
    "balance": Number,
    "point": Number
  }],
  "date": String,
  "services": Array,
  "content": [{
      "item": String,
      "cost": Number,
      "key": Number
    }
  ],
  "fittings": [{
      "name": String,
      "sellPrice": Number,
      "count": Number,
      "total": Number
    }
  ],
  "totalPrice": Number
},{versionKey: false});

module.exports = mongoose.model('Order', orderSchema,'order');
