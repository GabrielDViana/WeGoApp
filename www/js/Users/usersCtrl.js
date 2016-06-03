angular.module('starter')

.controller('UsersCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, ionicMaterialInk, factoryUser, factoryFollow,
  serviceLogin) {

  $scope.allUsers = function() {
    factoryCompanies.get(function(company) {
      $ionicLoading.hide();
      $rootScope.companys = company;
      console.log($rootScope.companys);
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Falhou'
      });
    })
  }

  $scope.viewUser = function(token) {
    factoryUser.get({
      token: token
    }, function(user) {
      $ionicLoading.hide();
      $rootScope.userp = user;
      console.log($rootScope.userp);
      $state.go('app.user');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Falhou'
      });
    })
  };




  $scope.follow = function(user) {
    user.main_user_auth_token = serviceLogin.getUser().auth_token;
    factoryFollow.save(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Voce esta seguindo {{user.name}}!'
      });
      console.log("BF create", user);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Houve um erro ao realizar operação'
      });
    });
  };

})
