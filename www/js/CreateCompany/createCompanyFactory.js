angular.module('starter')

.factory('factoryCreateCompany', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/company/create")
})
