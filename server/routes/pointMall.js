var express = require('express');
var router = express.Router();
var PointMall = require('../models/pointMall');

router.get("/listAll", (req, res, next) => {
  PointMall.find({}, (err, doc) => {
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

router.post('/newReward', (req, res, next) => {
  var id = Date.now()
  var reward = new PointMall(req.body);
  reward.id = id;
  reward.save((err) => {
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

router.post('/updateReward', (req, res, next) => {
  var param = {
    id: req.body.id
  }
  var point = req.body.point;
  PointMall.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
      doc.point = point;
      doc.originalPoint = point;
      doc.save();
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  })
})

router.post('/deleteReward', (req, res, next) => {
  var param = {
    id: req.body.id
  }
  PointMall.findOne(param, (err, doc) => {
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

module.exports = router;
