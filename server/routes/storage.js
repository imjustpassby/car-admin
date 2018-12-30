var express = require('express');
var router = express.Router();
var Storage = require('../models/storage.js');

router.get("/listAll", (req, res, next) => {
	Storage.find({}, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        msg: err.message,
        result: ""
      });
    } else {
      res.json({
        code: 20000,
        msg: '',
        result: doc
      });
    }
  })
})

module.exports = router;
