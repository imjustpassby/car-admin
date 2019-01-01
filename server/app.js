var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user')
var customersRouter = require('./routes/customers')
var staffRouter = require('./routes/staff')
var monthlyPayRouter = require('./routes/monthlyPay')
var storageRouter = require('./routes/storage')
var pointMallRouter = require('./routes/pointMall')
var orderRouter = require('./routes/order')
var purchasePayRouter = require('./routes/purchasePay')
var recordRouter = require('./routes/record')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',userRouter);
app.use('/customers',customersRouter);
app.use('/staff',staffRouter);
app.use('/monthlyPay',monthlyPayRouter);
app.use('/storage',storageRouter);
app.use('/pointMall',pointMallRouter);
app.use('/order',orderRouter);
app.use('/purchasePay',purchasePayRouter);
app.use('/record',recordRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
