var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");
const colors = require("colors");
const helmet = require('helmet');
const cors = require("cors");
const fileupload = require("express-fileupload");

// For image storage
const cloudinary = require("cloudinary");

dotenv.config();

// Calling Database connection
require("./database/index");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

// import for global winston logging
global.logging = require('./utils/logging.utils.js')()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(helmet());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', require("./routes/products"));
app.use('/api/categories', require("./routes/category"));

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
