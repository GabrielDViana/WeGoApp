angular.module('starter')

.controller('loginCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, factoryRegister, factoryLogin, serviceLogin,
  ionicMaterialInk, $timeout, $ionicPickerI18n, $ionicModal) {

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
        $state.go('app.home');
        $rootScope.user = serviceLogin.getUser();
        console.log("User:", $rootScope.user);
      }
    }, {
      remember: "sessionOnly",
      scope: "email, user_likes"
    });
  }
  $scope.loginTwitter = function() {

    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Data from Firebase:", authData);
        serviceLogin.setUser(
          authData.twitter.displayName,
          authData.twitter.email,
          authData.twitter.id
        );
        factoryRegister.save(serviceLogin.getUser());
        $state.go('app.home');
        $rootScope.user = serviceLogin.getUser();
        console.log("User:", $rootScope.user);
      }
    }, {
      remember: "sessionOnly",
      scope: "email, user_likes"
    });
  }

  $scope.minDate = new Date(2105, 6, 1);
  $scope.maxDate = new Date(2015, 6, 31);

  $scope.datePickerCallback = function (val) {
  	if (!val) {
  		console.log('Date not selected');
  	} else {
  		console.log('Selected date is : ', val);
  	}
  };

  $scope.loginEmail = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryLogin.get(user, function(user) {
      serviceLogin.setUser(
        user.name,
        user.email,
        user.auth_token
      );
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Logado!',
        template: '{{user}}'
      });
      $rootScope.user = serviceLogin.getUser();
      console.log($rootScope.user);
      $state.go('app.createcompany');
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

  $ionicModal.fromTemplateUrl('templates/terms.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

})
