var express = require("express");
var morgan = require("morgan");
var compress = require('compression');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Mongo = require('connect-mongo')(session);
var passport = require('passport');




module.exports = function() {
  var app = express();

  //middleware for morgan and compression
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  //use of public folder
  app.use(express.static(__dirname + "/public"));
  app.use('/node_modules', express.static(__dirname + '/node_modules'));





  return app;
}
