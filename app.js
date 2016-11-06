var express = require('./config/express');
var app = express();




//Initialise Server
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log('Server is running at localhost', app.get('port'));
});

module.exports = app;
