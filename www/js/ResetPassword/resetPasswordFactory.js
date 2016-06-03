angular.module('starter')

.factory('resetPasswordFactory', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/password_reset/create")
})

.factory('resetPasswordKeyEnterFactory', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/password_reset/:key/edit")
})

.factory('resetPasswordEditFactory', function($resource) {
  return $resource("http://wegoapp.herokuapp.com/password_reset/:key", {}, {
      'update': { method:'PATCH',
                  params:{  key:'@key' }
      }

  })
})
