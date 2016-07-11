angular.module('starter')

.factory('factoryCompanies', function($resource) {
  return $resource("http://2adcd6d1.ngrok.io/company/", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})

.factory('factoryCompany', function($resource) {
  return $resource("http://2adcd6d1.ngrok.io/company/show/", {}, {
      'get': { method:'GET',
                  params:{  token:'@token' }
      }

  })
})


.factory('factoryRating', function($resource) {
  return $resource("http://2adcd6d1.ngrok.io/company/rate")
})

.factory('factoryFavorite', function($resource) {
  return $resource("http://2adcd6d1.ngrok.io/company/favorite")
})

.factory('factoryFavorites', function($resource) {
  return $resource("http://2adcd6d1.ngrok.io/company/favorites/", {}, {
      'get': {
                  method:'GET',
                  params:{  auth_token:'@auth_token' },
                  isArray:true
      }

  })
})
