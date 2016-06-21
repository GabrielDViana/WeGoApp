angular.module('starter')

.controller('CompaniesCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, ionicMaterialInk, $timeout, factoryCompanies,
  serviceLogin, serviceLocation, serviceCompany, NgMap, $filter, factoryFavorite,
  factoryRating, factoryCompany, factoryFavorites, ratingConfig) {

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
  $scope.favorites = function(auth_token) {
    factoryFavorites.get({
      auth_token: auth_token
    }, function(company) {
      $ionicLoading.hide();
      $rootScope.companys = company;
      console.log($rootScope.companys);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Falhou'
      });
    })
  };

  $scope.isOperating = function(id)  {
    var sizedays = $rootScope.companys[id].days.length;
    var open = $filter('date')( $rootScope.companys[id].time_opens, 'HH:MM');
    var close = $filter('date')( $rootScope.companys[id].time_closes, 'HH:MM');
    console.log(open, close);
    for (var j = 0; j < sizedays; j++) {
      if ($scope.filtered === $rootScope.companys[id].days[j] && timeNow >= open && timeNow < close) {
        console.log('disponivel',$rootScope.companys[id].days[j],id);
        var x = document.getElementsByClassName('close-ribbon');
        // x[id].innerHTML = "Disponivel";
        x[id].style.color = "#33cd5f";
      }else if ($scope.filtered === $rootScope.companys[id].days[j]){
        var x = document.getElementsByClassName('close-ribbon');
        // x[id].innerHTML = "Indisponível";
        x[id].style.color = "#ef473a";
      }
    }
  }

  $scope.isItRated = function(ratings) {
    console.log("rate",ratings);
    var id = serviceLogin.getUser().id;
    console.log("id",id);
    for (var i = 0; i < ratings.length; i++) {
      if (id === ratings[i].user_id){
        console.log('avaliada',ratings[i]);
        $rootScope.isRated = true;
      }
    }
    console.log($rootScope.isRated);
  }

  var vm = this;

  vm.drivingMode = false; // indicates streetview should be on driving mode
  vm.drivingSpeed = 40; // 100 km per hour
  vm.driverMode = false;

  var updateFrequency = 1*1000; // half a second
  var savedPath = null;  // position and count to restart from pause mode

  // Overview path between orign and destination.
  // This does NOT exactly follow the path of a road. It is used to draw path on the map.
  var overviewPath=[];
  var overviewPathIndex=0;  // current index points of overview path

  // Detailed path between overview path points
  // This does exactly follow the path of a road.
  var detailedPath=[];
  var detailedPathIndex=0;  // current index points of detailed path

  var directionsService = new google.maps.DirectionsService();

  //
  // At google's mercy, we get points to drive
  //
  var driveOverviewPaths = function() {
    var op1, op2;
    // drive detailed path because we have not drove through all
    if (detailedPath.length > detailedPathIndex) {
      driveDetailedPaths(); //SHOW TIME !!!!
    }
    // drove all detailed path, get a new detailed path from overview paths
    else {
      op1 = overviewPath[overviewPathIndex];
      op2 = overviewPath[overviewPathIndex+1];
      overviewPathIndex += 1;
      if (op1 && op2) {
        var request ={origin:op1, destination:op2, travelMode: 'DRIVING'};
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            detailedPath = response.routes[0].overview_path;
            console.log('Updated detailedPath for overviewpath between',
              overviewPathIndex, 'and', overviewPathIndex+1,
              'with', detailedPath.length, 'geo points');
            detailedPathIndex = 0;
            driveOverviewPaths();
          }
        });
      }
    }
  };

  //
  // drive between two points by meter by meter and show it.
  //
  var driveDetailedPaths = function() {
    var meter = Math.floor(
      (parseInt(vm.drivingSpeed, 10) * 1000) / 3600  // how far we deive every second
      * (updateFrequency/1000));                         // how often do we see streetview
    var point1 = detailedPath[detailedPathIndex];
    var point2 = detailedPath[detailedPathIndex+1];

    if (point1 && point2) {
      //calculate where to look from two points
      var heading = google.maps.geometry.spherical.computeHeading(point1, point2);
      var distance = google.maps.geometry.spherical.computeDistanceBetween(point1, point2);
      var totalCount = parseInt(distance / meter, 10) || 1;

      var drive = function(count, position) {
        console.log(overviewPathIndex + '/' + overviewPath.length,
          detailedPathIndex + '/' + detailedPath.length,
          count + '/' + totalCount, 'distance', meter);
        if (totalCount >= count) {
          $timeout( function() {
            var pov = vm.map.getStreetView().getPov();
            if (vm.driverMode) {
              vm.map.setHeading(heading); // map heading is different from pov heading
              pov.heading = heading;
            }

            vm.map.getStreetView().setPosition(position);
            vm.map.getStreetView().setPov(pov);
            vm.map.getStreetView().setVisible(true);

            var distanceToPoint2 = google.maps.geometry.spherical.computeDistanceBetween(position, point2);
            var nextPosition = distanceToPoint2 < meter ?
              point2 : google.maps.geometry.spherical.computeOffset(position, meter, heading);
            if (vm.drivingMode) {
              drive(++count, nextPosition);
            } else {
              savedPath = {count: count, position: position};
              return false;
            }
          }, updateFrequency);
        } else {
          detailedPathIndex += 1;
          driveOverviewPaths();
        }
      };

      var count = (savedPath && savedPath.count) || 1;
      var position = (savedPath && savedPath.position) || point1;
      savedPath = null; // once start driving, nullify savedPath
      drive(count, position);

    } else {
      detailedPathIndex += 1;
      driveOverviewPaths();
    }
  };

  vm.drive = function() {
    vm.drivingMode = !vm.drivingMode;
    if (vm.drivingMode) {
      vm.map.setZoom(16);
      if (savedPath) { // if continues
        driveDetailedPaths();
      } else {
        driveOverviewPaths();
      }
    }
  };

  // When direction is changed
  // change overviewPath and reset driving directions
  vm.directionsChanged = function() {
    overviewPath = this.directions.routes[0].overview_path;
    console.log('direction is changed', 'got overviewPath with', overviewPath.length, 'points');
    vm.map.getStreetView().setPosition(overviewPath[0]);

    overviewPathIndex = 0; // set indexes to 0s
    detailedPathIndex = 0;
    vm.drivingMode = false;   // stop driving
    toContinue = null;     // reset continuing positon
  }

  NgMap.getMap().then(function(map) {
    vm.map = map;
  });

  $scope.viewCompany = function(token) {
    $rootScope.isRated = false;
    factoryCompany.get({
      token: token
    }, function(company) {
      $ionicLoading.hide();
      console.log(company);
      $rootScope.comp = company;
      $scope.isItRated(company.ratings);

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
