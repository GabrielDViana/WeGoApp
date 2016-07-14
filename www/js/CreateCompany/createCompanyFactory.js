angular.module('starter')

.factory('factoryCreateCompany', function($resource) {
  return $resource("http://aafd37ef.ngrok.io/company/create")
})

.factory('factoryGetCategories', function($resource) {
  return $resource("http://aafd37ef.ngrok.io/company/get_categories/", {}, {
      'get': {
                  method:'GET',
                  isArray:true
      }

  })
})
