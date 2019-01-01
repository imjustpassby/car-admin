var express = require('express');
var router = express.Router();
var Customers = require('../models/customers');

router.get("/listAll", (req, res, next) => {
  Customers.find({}, (err, doc) => {
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

router.post('/newVip', (req, res, next) => {
  var id = Date.now()
  var cusInfo = new Customers(req.body);
  cusInfo.id = id;
  cusInfo.save((err) => {
    if (err) {
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

router.post('/updateVip', (req, res, next) => {
  var brand = req.body.brand,
    phone = req.body.phone,
    plate = req.body.plate;
  var param = {
    id: req.body.id
  }
  Customers.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
      doc.brand = brand;
      doc.phone = phone;
      doc.plate = plate;
      doc.save();
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  })
})

router.post('/deleteVip', (req, res, next) => {
  var param = {
    id: req.body.id
  }
  Customers.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
      doc.remove();
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  })
})
//积分兑换
router.post('/descPoint', (req, res, next) => {
  var needPoint = req.body.needPoint;
  var param = {
    id: req.body.id
  }
  Customers.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
      doc.point -= needPoint;
      doc.save();
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  })
})
//充值
router.post('/refill', (req, res, next) => {
  var total = req.body.total;
  var param = {
    id: req.body.id
  }
  Customers.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
      doc.point += total;
      doc.balance += total;
      doc.save();
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  })
})
//花费
router.post('/changeBalance', (req, res, next) => {
  var total = req.body.total;
  var param = {
    id: req.body.id
  }
  Customers.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
      doc.balance -= total;
      doc.save();
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  })
})

module.exports = router;
