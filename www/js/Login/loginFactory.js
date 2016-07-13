angular.module('starter')

.factory('factoryRegister', function($resource) {
  return $resource("http://376dfa8b.ngrok.io/users/create")
})

.factory('factoryLogin', function($resource) {
  return $resource("http://376dfa8b.ngrok.io/users/login/:email")
})
.factory('factoryTwitter', function($resource) {
  return $resource("http://376dfa8b.ngrok.io/login_twitter/:id_social")
})
