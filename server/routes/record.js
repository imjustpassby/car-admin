var express = require('express');
var router = express.Router();
var Record = require('../models/record');

router.get("/listAll", (req, res, next) => {
    Record.find({}, (err, doc) => {
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

router.post('/exchangeReward', (req, res, next) => {
  var id = Date.now()
  var record = new Record(req.body);
  record.id = id;
  record.save((err)=>{
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
