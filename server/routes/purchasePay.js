var express = require('express');
var router = express.Router();
var PurchasePay = require('../models/purchasePay');

router.get("/listAll", (req, res, next) => {
    PurchasePay.find({}, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
			res.json({
				code: 20000,
				result: doc
			});
    }
  })
})

router.post('/addPay', (req, res, next) => {
  var id = Date.now()
  var pay = new PurchasePay(req.body);
  pay.id = id;
  pay.save((err)=>{
    if (err){
      res.json({
        code: 50001,
        result: err.message
      })
    } else {
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  });
})

module.exports = router;
