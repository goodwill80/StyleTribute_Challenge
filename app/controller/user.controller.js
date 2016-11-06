var User = require('../models/user.model');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var passportConf = require('../../config/security/passport')(passport);
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");


module.exports = {

signup: function(req, res, next){
  
}






}
