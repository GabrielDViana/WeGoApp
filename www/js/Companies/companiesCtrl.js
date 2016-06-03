angular.module('starter')

.controller('CompaniesCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, ionicMaterialInk, $timeout, factoryCompanies,
  serviceLogin, serviceLocation, serviceCompany, $cordovaGeolocation, $filter,
  factoryRating, factoryCompany) {

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
  $scope.allCompanies = function() {
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

  $scope.viewCompany = function(token) {
    factoryCompany.get({
      token: token
    }, function(company) {
      $ionicLoading.hide();
      $rootScope.comp = company;
      console.log($rootScope.comp);
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Falhou'
      });
    })

    $state.go('app.company');
    console.log($rootScope.comp);
  };

  $scope.myTitle = 'IONIC RATINGS DEMO';

  $scope.ratingsObject = {
    iconOn: 'ion-ios-star',
    iconOff: 'ion-ios-star-outline',
    iconOnColor: 'rgb(200, 200, 100)',
    iconOffColor: 'rgb(200, 100, 100)',
    rating: 4,
    minRating: 0,
    readOnly:false,
    callback: function(rating) {
      $scope.ratingsCallback(rating);
    }
  };

  $scope.ratingsCallback = function(rating) {
    $scope.rate = rating;
    console.log('Selected rating is : ', rating);
  };


  $scope.submitRatig = function() {
    var rating = {};
    console.log(serviceLogin.getUser().auth_token, serviceCompany.getCompany().id,
  $scope.rate);

    rating.user_auth_token = serviceLogin.getUser().auth_token;
    rating.company_token = serviceCompany.getCompany().token;
    rating.id = serviceCompany.getCompany().id;
    rating.rate = $scope.rate;
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryRating.save(rating, function(rating) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Avaliação submetida com sucesso!'
      });
      console.log("BF create", rating);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Cadastro falhou, verifique os dados ou se o email ja foi cadastrado'
      });
    });
  }

})
