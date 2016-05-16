angular.module('starter')

.controller('locationCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $cordovaGeolocation, serviceLocation) {

  $scope.locate = function(){

  $cordovaGeolocation.getCurrentPosition()
    .then(function (position) {
      serviceLocation.setLocation(
        position.coords.latitude,
        position.coords.longitude
      );

    }, function(err) {
      // error
      console.log("Nao foi possivel localzar seu dispositivo!");
      console.log(err);
    });
  };

})
