var express = require('express');
var router = express.Router();
var MonthlyPay = require('../models/monthlyPay');

router.get("/listAll", (req, res, next) => {
  MonthlyPay.find({}, (err, doc) => {
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
  var pay = new MonthlyPay(req.body);
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
