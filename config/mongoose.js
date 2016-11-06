var config = require('./config');
var mongoose = require('mongoose');
var secret = require('./security/secret');

module.exports = function() {
  var db = mongoose.connect(secret.database);
  mongoose.Promise = global.Promise;
  require('../app/models/user.model');
  return db;
};
