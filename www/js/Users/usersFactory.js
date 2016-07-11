angular.module('starter')

.factory('factoryUser', function($resource) {
  return $resource("http://2adcd6d1.ngrok.io/users/show")
})

.factory('factoryFollow', function($resource) {
  return $resource("http://2adcd6d1.ngrok.io/users/follow")
})
