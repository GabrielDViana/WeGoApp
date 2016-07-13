angular.module('starter')

.factory('factoryCreateCompany', function($resource) {
  return $resource("http://376dfa8b.ngrok.io/company/create")
})

.factory('factoryGetCategories', function($resource) {
  return $resource("http://376dfa8b.ngrok.io/company/get_categories/", {}, {
      'get': {
                  method:'GET',
                  isArray:true
      }

  })
})
