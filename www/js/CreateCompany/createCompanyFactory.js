angular.module('starter')

.factory('factoryCreateCompany', function($resource,URL) {
  return $resource("http://localhost:3000/company/create")
})

.factory('factoryGetCategories', function($resource,URL) {
  return $resource("http://localhost:3000/company/get_categories/", {}, {
      'get': {
                  method:'GET',
                  isArray:true
      }

  })
})
