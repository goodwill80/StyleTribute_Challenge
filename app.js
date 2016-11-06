var express = require('./config/express');
var mongoose = require('./config/mongoose');
var secret = require('./config/security/secret');
var db = mongoose();
var app = express();





//Initialise Server
app.set('port', (process.env.PORT || secret.port));
app.listen(app.get('port'), function() {
  console.log('Server is running at localhost', app.get('port'));
});

module.exports = app;
