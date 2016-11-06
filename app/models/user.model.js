var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema ({
  email: { type: String, unique: true, lowercase: true},
  password: String,
  timestamps: {}
});


// before saving into moongoose. Passing salt to maskoff the password
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// compare password in the database and the one user type in
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

mongoose.model('User', UserSchema);
