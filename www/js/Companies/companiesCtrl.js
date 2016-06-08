angular.module('starter')

.controller('CompaniesCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, ionicMaterialInk, $timeout, factoryCompanies,
  serviceLogin, serviceLocation, serviceCompany, $cordovaGeolocation, $filter,
  factoryRating, factoryCompany, factoryFavorite, ratingConfig) {

  $rootScope.isOwner;
  var today = new Date();
  var hournow = today.getTime();
  var timeNow = $filter('date')(hournow,'HH:MM');
  console.log(timeNow);
  $scope.filtered = $filter('date')(today, 'EEEE');

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
  $scope.isOperating =function(id)  {

      var sizedays = $rootScope.companys[id].days.length;
      var open = $filter('date')( $rootScope.companys[id].time_opens, 'HH:MM');
      var close = $filter('date')( $rootScope.companys[id].time_closes, 'HH:MM');
      console.log(open, close);
      for (var j = 0; j < sizedays; j++) {
        if ($scope.filtered === $rootScope.companys[id].days[j] && timeNow >= open && timeNow < close) {
          console.log('disponivel',$rootScope.companys[id].days[j],id);
          var x = document.getElementsByClassName('available');
          x[id].innerHTML = "Disponivel";
          x[id].style.backgroundColor = "#33cd5f";
        }
      }

  }
  // $scope.ratingsObject = {
  //   iconOn: 'ion-ios-star',
  //   iconOff: 'ion-ios-star-outline',
  //   iconOnColor: 'rgb(200, 200, 100)',
  //   iconOffColor: 'rgb(200, 100, 100)',
  //   rating:  3,
  //   minRating:1,
  //   readOnly:false,
  //   callback: function(rating) {
  //     $scope.ratingsCallback(rating);
  //     $scope.rate = rating;
  //   }
  // };
  $scope.viewCompany = function(token) {
    factoryCompany.get({
      token: token
    }, function(company) {
      $ionicLoading.hide();
      console.log(company);
      $rootScope.comp = company;


      if (company.user.auth_token === serviceLogin.getUser().auth_token){
        $rootScope.isOwner = true;
      }else {
        $rootScope.isOwner = false;
      }
      console.log($rootScope.isOwner);
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
  };

  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;
  $scope.readOnly = true;

  $scope.submitRatig = function(comment) {
    var rating = {};
    console.log(serviceLogin.getUser().auth_token, serviceCompany.getCompany().id,
  $scope.rate);

    rating.user_auth_token = serviceLogin.getUser().auth_token;
    rating.company_token = $rootScope.comp.token;
    rating.id = $rootScope.comp.id;
    rating.rate = $scope.rating.rate;
    rating.comment = comment;
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
        template: 'Não foi possivel enviar sua avaliaçao'
      });
    });
  }

  $scope.addToFavorites = function() {
    var favorite = {};

    favorite.user_auth_token = serviceLogin.getUser().auth_token;
    favorite.company_token = $rootScope.comp.token;
    favorite.id = $rootScope.comp.id;
    console.log(favorite);
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryFavorite.save(favorite, function(favorite) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Adicionado aos favoritos!'
      });
      console.log("BF create", favorite);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não foi possivel adicionar aos favoritos!'
      });
    });
  }

})
