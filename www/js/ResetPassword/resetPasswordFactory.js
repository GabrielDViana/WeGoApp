angular.module('starter')

.factory('resetPasswordFactory', function($resource,URL) {
  return $resource("http://localhost:3000/password_reset/create")
})

.factory('resetPasswordKeyEnterFactory', function($resource,URL) {
  return $resource("http://localhost:3000/password_reset/:key/edit")
})

.factory('resetPasswordEditFactory', function($resource,URL) {
  return $resource("http://localhost:3000/password_reset/:key", {}, {
      'update': { method:'PATCH',
                  params:{  key:'@key' }
      }

  })
})
