angular.module('starter')

.factory('factoryUser', function($resource,URL) {
  return $resource("http://localhost:3000/users/show")
})

.factory('factoryFollow', function($resource,URL) {
  return $resource("http://localhost:3000/users/follow")
})
