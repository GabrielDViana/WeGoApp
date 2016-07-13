angular.module('starter')

.factory('factoryUser', function($resource) {
  return $resource("http://376dfa8b.ngrok.io/users/show")
})

.factory('factoryFollow', function($resource) {
  return $resource("http://376dfa8b.ngrok.io/users/follow")
})
