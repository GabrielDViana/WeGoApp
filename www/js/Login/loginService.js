angular.module('starter')

.service('serviceLogin', function() {

  var user = {}

  var setUser = function(name, email, auth_token, birthday, gender) {
    user.name = name,
    user.email = email,
    user.auth_token = auth_token,
    user.birthday = birthday
    user.gender = gender
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

.service('serviceRegisterSocial', function() {

  var user = {}

  var setUser = function(name, email, id_social, gender, birthday) {
    user.name = name,
    user.email = email,
    user.id_social = id_social,
    user.password = id_social,
    user.password_confirmation = id_social
    user.gender = gender,
    user.birthday = birthday
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})
