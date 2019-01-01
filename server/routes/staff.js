var express = require('express');
var router = express.Router();
var Staff = require('../models/staff');

router.get("/listAll", (req, res, next) => {
  Staff.find({}, (err, doc) => {
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

router.post('/newStaff', (req, res, next) => {
  var id = Date.now()
  var staff = new Staff(req.body);
  staff.id = id;
  staff.save((err)=>{
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

router.post('/updateStaff',(req,res,next)=>{
  var date = req.body.date,
      address = req.body.address,
      phone = req.body.phone,
      sex = req.body.sex,
      position = req.body.position,
      baseSalary = req.body.baseSalary,
      extra = req.body.extra,
      welfare = req.body.welfare,
      total = baseSalary + extra + welfare;
  var param = {
    id: req.body.id
  }
  Staff.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        code: 50001,
        result: err.message
      });
    } else {
      doc.date = date;
      doc.phone = phone;
      doc.address = address;
      doc.sex = sex;
      doc.position = position;
      doc.baseSalary = baseSalary;
      doc.extra = extra;
      doc.welfare = welfare;
      doc.total = total;
      doc.save();
      res.json({
        code: 20000,
        result: 'success'
      });
    }
  })
})

router.post('/deleteStaff',(req,res,next)=>{
  var param = {
    id: req.body.id
  }
  Staff.findOne(param, (err, doc) => {
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
