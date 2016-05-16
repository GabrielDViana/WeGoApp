angular.module('starter')

.service('serviceLogin', function() {

  var user = {}

  var setUser = function(name, email, auth_token, id) {
    user.name = name,
    user.email = email,
    user.auth_token = auth_token,
    user.id = id
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})

.service('serviceLoginSocial', function() {

  var user = {}

  var setUser = function(name, email, id_social) {
    user.name = name,
    user.email = email,
    user.id_social = id_social,
    user.password = id_social,
    user.password_confirmation = id_social
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})
