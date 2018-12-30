var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://127.0.0.1:27017/car-admin', {
  useNewUrlParser: true
});

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express Good' });
});

module.exports = router;
