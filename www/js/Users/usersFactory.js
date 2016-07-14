angular.module('starter')

.factory('factoryUser', function($resource) {
  return $resource("http://aafd37ef.ngrok.io/users/show")
})

.factory('factoryFollow', function($resource) {
  return $resource("http://aafd37ef.ngrok.io/users/follow")
})
