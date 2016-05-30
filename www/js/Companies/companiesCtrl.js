angular.module('starter')

.controller('CompaniesCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, ionicMaterialInk, $timeout, factoryCompanies,
  serviceLogin, serviceLocation, serviceCompany, $cordovaGeolocation, $filter) {

  $scope.today = new Date();
  $scope.filtered = $filter('date')($scope.today, 'EEEE');

  $scope.days = [
    {id: 'Sunday', text: 'Domingo'},
    {id: 'Monday', text: 'Segunda'},
    {id: 'Tuesday', text: 'Terça'},
    {id: 'Wednesday', text: 'Quarta'},
    {id: 'Thursday', text: 'Quinta'},
    {id: 'Friday', text: 'Sexta'},
    {id: 'Saturday', text: 'Sábado'}
  ];
  $scope.company = {
    days: {}
  };

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


  $scope.viewCompany = function(company) {
    serviceCompany.setCompany(
      company.name,
      company.description,
      company.adress,
      company.latitude,
      company.longitude,
      company.token,
      company.days,
      company.time_opens,
      company.time_closes
    )

    $state.go('app.company');
    $rootScope.comp = serviceCompany.getCompany();
    console.log($rootScope.comp);
  };

})
