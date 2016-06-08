angular.module('starter')

.controller('loginCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, factoryRegister, factoryLogin, serviceLogin,
  ionicMaterialInk, $timeout, $ionicPickerI18n, $ionicModal, factoryTwitter,
  serviceLoginSocial, serviceRegisterSocial) {

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

        $state.go('app.createcompany');
        console.log("Data from Firebase:", authData);
        serviceLogin.setUser(
          authData.facebook.displayName,
          authData.facebook.email,
          authData.facebook.id,
          authData.facebook.cachedUserProfile.birthday,
          authData.facebook.cachedUserProfile.gender
        );
        serviceRegisterSocial.setUser(
          authData.facebook.displayName,
          authData.facebook.email,
          authData.facebook.id,
          authData.facebook.cachedUserProfile.gender,
          new Date(authData.facebook.cachedUserProfile.birthday)
        )
        factoryRegister.save(serviceRegisterSocial.getUser(), function(user) {
          $ionicLoading.hide();
          $ionicPopup.alert({
            title: 'Ops!',
            template: 'Primeiro acesso. Seu cadastro será efetuado em nosso banco!'
          });
          $state.go('app.createcompany');
          console.log(user);
        }, function(error) {
          $ionicLoading.hide();
        });
        $scope.loginEmail(serviceRegisterSocial.getUser());
        $state.go('app.home');
        $rootScope.user = serviceLogin.getUser();
        console.log("User:", $rootScope.user);
      }
    }, {
      remember: "sessionOnly",
      scope: "email, user_likes, user_birthday"
    });
  }
  $scope.loginTwitter = function() {

    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Data from Firebase:", authData);
        serviceLoginSocial.setUser(
          authData.twitter.displayName,
          authData.twitter.email,
          authData.twitter.id
        );

        console.log("try",serviceLoginSocial.getUser());
        factoryTwitter.get(serviceLoginSocial.getUser(), function(user) {
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
            title: 'Ops!',
            template: 'Você ainda não está registrado!'
          });
          $state.go('app.twitterregister');
        })
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
        user.auth_token,
        user.birthday,
        user.gender
      );
      $ionicLoading.hide();
      $rootScope.user = serviceLogin.getUser();
      console.log(user);
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
        template: 'Cadastro efetuado com sucesso!'
      });
      $state.go('app.home');
      console.log("BF create", user);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Cadastro falhou, verifique os dados ou se o email ja foi cadastrado'
      });
    });
  }

  $scope.registerTwitter = function(user) {
    $scope.dataFromFirebase = serviceLoginSocial.getUser();
    serviceRegisterSocial.setUser(
      $scope.dataFromFirebase.name,
      user.email,
      $scope.dataFromFirebase.id_social,
      user.gender,
      user.birthday
    );
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryRegister.save(serviceRegisterSocial.getUser(), function(user) {
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
