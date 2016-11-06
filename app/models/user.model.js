var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema ({
  email: { type: String, unique: true, lowercase: true},
  password: String,
  timestamps: {}
})
