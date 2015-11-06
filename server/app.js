var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/**
 * Routes
 */
var routes = require('./routes/home/index');
var app = express();

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, '../client/spa_server_views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Database
 */
mongoose.connect('mongodb://localhost/node-angular-2');


/**
 * Environemnts
 */

if (app.get('env') === 'development') {
 
  // Open db connection and list to error and sucess
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Unable to connect to database'));
  db.once('open', function(callback) {
    console.log("#### Connect to db : node-angular-2");
  })

  // Handle 500 errors
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
