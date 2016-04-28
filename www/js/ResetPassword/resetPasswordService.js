angular.module('starter')

.service('resetPasswordService', function() {

  var user = {}

  var setUser = function(passwordResetKey, password, passwordConfirmation) {
    user.password_reset_key = passwordResetKey
    user.password = password,
    user.password_confirmation = passwordConfirmation
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})
