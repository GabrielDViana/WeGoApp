angular.module('starter')

.factory('factoryUser', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/users/show")
})

.factory('factoryFollow', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/users/follow")
})
