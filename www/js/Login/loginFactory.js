angular.module('starter')

.factory('factoryRegister', function($resource) {
  return $resource("http://localhost:3000/users/create")
})

.factory('factoryLogin', function($resource) {
  return $resource("http://localhost:3000/users/login/:email")
})
.factory('factoryTwitter', function($resource) {
  return $resource("http://localhost:3000/login_twitter/:id_social")
})
