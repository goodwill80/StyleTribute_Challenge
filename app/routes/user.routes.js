module.exports = function(app) {

  var userController = require('../controller/user.controller');

  app.route('/signup')
  .post(userController.signup)

  app.route('/login')
  .post(userController.login)








}
