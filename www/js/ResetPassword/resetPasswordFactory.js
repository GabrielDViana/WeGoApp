angular.module('starter')

.factory('resetPasswordFactory', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/password_reset/create")
})

.factory('resetPasswordKeyEnterFactory', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/password_reset/:key/edit")
})

.factory('resetPasswordEditFactory', function($resource) {
  return $resource("http://bfcaa4c7.ngrok.io/password_reset/:key", {}, {
      'update': { method:'PATCH',
                  params:{  key:'@key' }
      }

  })
})
