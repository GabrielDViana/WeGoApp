angular.module('starter')

.factory('factoryUser', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/users/show")
})

.factory('factoryFollow', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/users/follow")
})
