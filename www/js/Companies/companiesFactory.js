angular.module('starter')

.factory('factoryCompanies', function($resource) {
  return $resource("http://localhost:3000/company/", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})
 
.factory('factoryRating', function($resource) {
  return $resource("http://localhost:3000/company/rate")
})
