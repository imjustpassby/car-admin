var express = require('express');
var router = express.Router();
var Storage = require('../models/storage.js');

router.get("/listAll", (req, res, next) => {
  Storage.find({}, (err, doc) => {
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

router.post('/newFitting', (req, res, next) => {
  var param = {
    id: req.body.id
  };
  Storage.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
        if (doc) {
          doc.date = req.body.date;
          doc.count = req.body.count;
          doc.buyPrice = req.body.buyPrice;
          doc.sellPrice = req.body.sellPrice;
          doc.save();
          res.json({
            code: 20000,
            result: "success"
          });
      } else {
        var id = Date.now()
        var fitting = new Storage(req.body);
        fitting.id = id;
        fitting.save((err1) => {
          if (err1) {
            res.json({
              code: 50001,
              result: err1.message
            })
          } else {
            res.json({
              code: 20000,
              result: 'success'
            });
          }
        });
      }
    }
  })
})

router.post('/updateFitting', (req, res, next) => {
  var param = {
    id: req.body.id
  };
  var count = req.body.count,
    sellPrice = req.body.sellPrice;
  Storage.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
      doc.count = count;
      doc.sellPrice = sellPrice;
      doc.save();
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  })
})

router.post('/deleteFitting', (req, res, next) => {
  var param = {
    id: req.body.id
  };
  Storage.findOne(param, (err, doc) => {
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

router.post('/descFitting', (req, res, next) => {
  var fittingList = req.body;
  if (!fittingList) {
    res.json({
      code: 20000,
      result: 'success'
    });
  } else {
    fittingList.forEach(item => {
      let param = {
        id: item.id
      };
      Storage.findOne(param, (err, doc) => {
        if (err) {
          res.json({
            code: 50001,
            result: err.message
          });
        } else {
          doc.count -= item.count;
          doc.save();
        }
      })
    });
    res.json({
      code: 20000,
      result: 'success'
    });
  }
})

module.exports = router;
