angular.module('starter')

.controller('ResetPasswordCtrl', function($scope, resetPasswordFactory,
  resetPasswordKeyEnterFactory, $ionicPopup, $state, resetPasswordService,
  resetPasswordEditFactory, $rootScope, $ionicLoading) {

  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

  $scope.resetPassword = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    resetPasswordFactory.save(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Atenção!',
        template: 'Foi enviado um código para o seu email!'
      });
      console.log(user);
      $state.go('app.resetkeyenter');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Email invalido, verifique os dados ou se o email já foi cadastrado'
      });
    });
  }

  $scope.resetPasswordKeyEnter = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    resetPasswordKeyEnterFactory.get(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Atenção!',
        template: 'Chave confirmada!'
      });
      resetPasswordService.setUser(
        user.password_reset_key,
        null,
        null
      );
      $rootScope.user = resetPasswordService.getUser();
      console.log("User", resetPasswordService.getUser());
      $state.go('app.resetedit');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Chave expirada ou invalida!'
      });
    });
  }

  $scope.resetPasswordEdit = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    resetPasswordService.setUser(
      $rootScope.user.password_reset_key,
      user.password,
      user.password_confirmation
    );
    $rootScope.user = resetPasswordService.getUser();

    resetPasswordEditFactory.update({
      key: user.password_reset_key
    }, {
      user: $rootScope.user
    }, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Atenção!',
        template: 'Troca de Senha efetuada!'
      });
      $state.go('app.home');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Senha invalida!'
      });
    });
  }

})
