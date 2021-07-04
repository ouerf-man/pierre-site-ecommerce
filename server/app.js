const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");
const cors = require('cors');

const dbService = require('./configs/db.service');
const coeffInit = require('./configs/initCoeffs')

const userRouter = require('./routes/user')
const reportageRouter = require('./routes/reportage')
const blogRouter = require('./routes/blog')
const paymentRouter = require('./routes/payment')
const coeffRouter = require('./routes/coeff')

const { renderFile } = require('jade');
const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./utils/passport")(passport);
// connecting to database
dbService.establishConnection();
coeffInit()
app.use('/health',function(req,res){
  res.send('health 100%')
})
app.use("/user",userRouter)
app.use("/reportage",reportageRouter)
app.use("/blog",blogRouter)
app.use("/payment",paymentRouter)
app.use("/coeff",coeffRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
