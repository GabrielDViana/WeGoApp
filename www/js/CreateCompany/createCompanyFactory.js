angular.module('starter')

.factory('factoryCreateCompany', function($resource) {
  return $resource("http://2adcd6d1.ngrok.io/company/create")
})
