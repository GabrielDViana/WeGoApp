angular.module('starter')

.factory('factoryRegister', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/users/create")
})

.factory('factoryLogin', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/users/login/:email")
})
.factory('factoryTwitter', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/login_twitter/:id_social")
})
