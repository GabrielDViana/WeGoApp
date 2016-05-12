angular.module('starter')

.factory('factoryCreateCompany', function($resource) {
  return $resource("http://localhost:3000/company/create")
})
