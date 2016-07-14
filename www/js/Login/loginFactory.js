angular.module('starter')

.factory('factoryRegister', function($resource) {
  return $resource("http://aafd37ef.ngrok.io/users/create")
})

.factory('factoryLogin', function($resource) {
  return $resource("http://aafd37ef.ngrok.io/users/login/:email")
})
.factory('factoryTwitter', function($resource) {
  return $resource("http://aafd37ef.ngrok.io/login_twitter/:id_social")
})
