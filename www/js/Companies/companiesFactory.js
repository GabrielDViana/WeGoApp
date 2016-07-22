angular.module('starter')

.factory('factoryCompanies', function($resource) {
  return $resource("http://localhost:3000/company/", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})

.factory('factoryCompany', function($resource) {
  return $resource("http://localhost:3000/company/show/", {}, {
      'get': { method:'GET',
                  params:{  token:'@token' }
      }

  })
})


.factory('factoryRating', function($resource) {
  return $resource("http://localhost:3000/company/rate")
})

.factory('factoryFavorite', function($resource) {
  return $resource("http://localhost:3000/company/favorite")
})

.factory('factoryFavorites', function($resource) {
  return $resource("http://localhost:3000/company/favorites/", {}, {
      'get': {
                  method:'GET',
                  params:{  auth_token:'@auth_token' },
                  isArray:true
      }

  })
})
