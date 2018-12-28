var express = require('express');
var router = express.Router();

router.get('/getInfo',(req, res, next) => {
  res.json({
    code: 20000,
    msg: "",
    result: 'this is /test/getInfo api result.'
    });
});

router.get('/testApi',(req, res, next) => {
  res.json({
    code: 20000,
    msg: "",
    result: 'this is /test/testApi api result.'
    });
});

module.exports = router;