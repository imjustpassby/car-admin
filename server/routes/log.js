var express = require('express');
var router = express.Router();
var Log = require('../models/log');

router.get("/listAll", (req, res, next) => {
    Log.find({}, (err, doc) => {
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

router.post('/newLog', (req, res, next) => {
  var id = Date.now()
  var log = new Log(req.body);
  log.id = id;
  log.save((err) => {
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

module.exports = router;
