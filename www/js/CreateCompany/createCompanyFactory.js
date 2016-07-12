angular.module('starter')

.factory('factoryCreateCompany', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/company/create")
})
