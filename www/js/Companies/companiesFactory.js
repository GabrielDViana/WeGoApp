angular.module('starter')

.factory('factoryCompanies', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/company/", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})

.factory('factoryCompany', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/company/show/", {}, {
      'get': { method:'GET',
                  params:{  token:'@token' }
      }

  })
})


.factory('factoryRating', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/company/rate")
})
