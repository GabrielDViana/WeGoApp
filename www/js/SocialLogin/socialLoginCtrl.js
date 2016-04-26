angular.module('starter')

.controller('socialLoginCtrl', function($ionicPopup ,$scope, $state, $stateParams, $rootScope) {
    var ref = new Firebase("https://appwego.firebaseio.com");

    $scope.loginFacebook = function() {

    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $scope.user = authData;
        console.log(authData.email);
        console.log("Authenticated successfully:", $scope.user);
        }
      }, {
      remember: "sessionOnly",
      scope: "email,user_likes"
  });
  }

})
