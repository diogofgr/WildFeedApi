var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

// config db
require('./db/mongoose');

// register Models
require('./models/User');
require('./models/Post');

// configure Passport
require('./services/passport');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api/');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// no need to use sessions because where usign jwt
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }));

app.use(passport.initialize());
// app.use(passport.session());

// API routes;
app.use('/', indexRouter);
app.use('/api/posts', apiRouter.posts);
app.use('/api/auth', apiRouter.auth);

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
