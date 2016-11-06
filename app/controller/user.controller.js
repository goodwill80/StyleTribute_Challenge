var User = require('mongoose').model('User');
var passport = require('passport');
var secret = require('../../config/security/secret');
var passportConf = require('../../config/security/passport')(passport);
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var blacklist = require('express-jwt-blacklist');
var NodeSession = require('node-session');



blacklist.configure({
  tokenId: 'id'
});



module.exports = {

  signup: function(req, res, next) {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    User.findOne({
        email: req.body.email
      }, function(err, existingUser) {
        if (existingUser) {
          res.status(400).json("User already exist");
        } else {
          user.save(function(err, user) {
            if (err) return res.status(400).send(err);
            res.status(200).json("Signup Successful!");
            // var payload = {
            //   id: user.id,
            //   email: user.email
            // };
            // var expiryObj = {
            //   expiresIn: '3h'
            // };
            // var jwt_token = jwt.sign(payload, secret.secretKey, expiryObj);
            // var userID = user.id;
            // passport.authenticate('local')(req, res, function() {
            //   return res.status(200).send({
            //     token: jwt_token,
            //     id: userID,
            //   });
            // });
          })
        }
      })
    },

      login: function(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({
          email: email
        }).exec(function(err, user) {
          if (err) {
            console.log(err);
            res.status(400).json(err);
          } else {
            if (bcrypt.compareSync(password, user.password)) {
              console.log("User found", user);
              var token = jwt.sign({
                email: user.email,
                _id: user._id
              }, secret.secretKey, {
                expiresIn: '3h'
              });
              res.status(200).json({
                sucess: true,
                token: token
              });
            } else {
              res.status(401).json("Unauthorised access, please check your email or password!");
            }
          }
        })
      },

      logout: function(req, res, next){
        blacklist.revoke(req.user);
        req.logOut();
        req.session.destroy();
        res.status(200).json("Successful logout!");
      },

      session: function(req, res, next){
        var sessions = req.sessionID ;
        res.json(req.sessionID);
      }


  }
