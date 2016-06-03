angular.module('starter')

.factory('factoryRegister', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/users/create")
})

.factory('factoryLogin', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/users/login/:email")
})
.factory('factoryTwitter', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/login_twitter/:id_social")
})
