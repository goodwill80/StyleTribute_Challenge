var User = require('mongoose').model('User');
var mongoose = require('mongoose');
var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var passportConf = require('../../config/security/passport')(passport);
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");



module.exports = {

  signup: function(req, res, next) {

    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    User.findOne({
      email: req.body.email
    }, function(err, existingUser) {
      if (existingUser) {
        console.log("User already exists!")
        return res.status(409).send(err);
      } else {
        user.save(function(err, user) {
          if (err) return res.status(400).send(err);
          var payload = {
            id: user.id,
            email: user.email
          };
          var expiryObj = {
            expiresIn: '3h'
          };
          var jwt_token = jwt.sign(payload, config.secretKey, expiryObj);
          var userID = user.id;
          passport.authenticate('local')(req, res, function() {
            return res.status(202).send({
              token: jwt_token,
              id: userID
            });
          });
        });
      }
    })
  }




}
