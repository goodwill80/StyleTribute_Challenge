var express = require("express");
var morgan = require("morgan");
var compress = require('compression');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Mongo = require('connect-mongo')(session);
var passport = require('passport');
var secret = require('./security/secret');
var User = require('../app/models/user.model');

module.exports = function() {
  var app = express();

  //CORS
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST,DELETE,PULL,PATCH,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  //for JSON
  app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(bodyParser.json());

  //user middleware
  app.use(function(req, res, next){
     res.locals.user = req.user;
     next();
   })



  //middleware for morgan and compression
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  //Setting up of session storage for cookies and initialising passport
  app.use(cookieParser());
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new Mongo({
      url: secret.database,
      autoReconnect: true
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  //middleware for method-override
  app.use(methodOverride());

  //initialise router
  require('../app/routes/user.routes')(app);

  //use of public folder
  app.use(express.static(__dirname + "/public"));
  app.use('/node_modules', express.static(__dirname + '/node_modules'));



  return app;
}
