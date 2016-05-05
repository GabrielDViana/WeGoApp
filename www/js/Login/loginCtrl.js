angular.module('starter')

.controller('loginCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, factoryRegister, factoryLogin, serviceLogin,
  ionicMaterialInk, $timeout) {

  $scope.$parent.clearFabs();
  $timeout(function() {
    $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();

  var ref = new Firebase("https://appwego.firebaseio.com");

  $scope.loginFacebook = function() {

    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Data from Firebase:", authData);
        serviceLogin.setUser(
          authData.facebook.displayName,
          authData.facebook.email,
          authData.facebook.id
        );
        factoryRegister.save(serviceLogin.getUser());
        $state.go('app.profile');
        $rootScope.user = serviceLogin.getUser();
        console.log("User:", $rootScope.user);
      }
    }, {
      remember: "sessionOnly",
      scope: "email, user_likes"
    });
  }


  $scope.loginEmail = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryLogin.get(user, function(user) {
      serviceLogin.setUser(
        user.name,
        user.email,
        user.token
      );
      factoryRegister.save(serviceLogin.getUser());
      $rootScope.user = serviceLogin.getUser();
      console.log($rootScope.user);
      $state.go('app.profile');
      $ionicLoading.hide();
      $rootScope.logged = true;
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Login Falhou'
      });
    })
  }

  $scope.registerEmail = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryRegister.save(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Logado com sucesso!'
      });
      console.log(user);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Cadastro falhou, verifique os dados ou se o email ja foi cadastrado'
      });
    });
  }

  $scope.logout = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    serviceLogin.setUser(
      null,
      null,
      null,
      null
    );
    factoryRegister.save(serviceLogin.getUser());
    $rootScope.user = serviceLogin.getUser();
    console.log($rootScope.user);
    $state.go('app.home');
    $ionicLoading.hide();
    $rootScope.fblogged = false;
    $rootScope.logged = false;
  }
})
