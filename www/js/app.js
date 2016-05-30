angular.module('starter', ['ionic','firebase','ngCordova','ngResource',
  'ionMdInput','ionic-material','ion-datetime-picker', 'leaflet-directive', 'checklist-model'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'loginCtrl'
        }
      }
    })
    .state('app.register', {
      url: '/registerEmail',
      views: {
        'menuContent': {
          templateUrl: 'templates/registerEmail.html',
          controller: 'loginCtrl'
        }
      }
    })
    .state('app.resetsend', {
        url: '/resetsend',
        views: {
          'menuContent': {
            templateUrl: 'templates/resetSend.html',
            controller: 'ResetPasswordCtrl'
          }
        }
      })
      .state('app.resetedit', {
        url: '/resetedit',
        views: {
          'menuContent': {
            templateUrl: 'templates/resetEdit.html',
            controller: 'ResetPasswordCtrl'
          }
        }
      })
      .state('app.resetkeyenter', {
        url: '/resetkeyenter',
        views: {
          'menuContent': {
            templateUrl: 'templates/resetKeyEnter.html',
            controller: 'ResetPasswordCtrl'
          }
        }
      })
      .state('app.createcompany', {
        url: '/createcompany',
        views: {
          'menuContent': {
            templateUrl: 'templates/createCompany.html',
            controller: 'createCompanyCtrl'
          }
        }
      })
      .state('app.twitterregister', {
        url: '/twitterregister',
        views: {
          'menuContent': {
            templateUrl: 'templates/twitterRegister.html',
            controller: 'loginCtrl'
          }
        }
      })
      .state('app.profile', {
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'loginCtrl'
          }
        }
      })
      .state('app.companies', {
        url: '/companies',
        views: {
          'menuContent': {
            templateUrl: 'templates/companies.html',
            controller: 'CompaniesCtrl'
          }
        }
      })
      .state('app.company', {
        url: '/company',
        views: {
          'menuContent': {
            templateUrl: 'templates/company.html',
            controller: 'CompaniesCtrl'
          }
        }
      })
      ;
  $urlRouterProvider.otherwise("app/home");
})

.controller("MainController", ['$scope', '$ionicSideMenuDelegate', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
}])
.run(function($ionicPickerI18n) {
    $ionicPickerI18n.weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    $ionicPickerI18n.months =  ["Jan", "Fev", "Março", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    $ionicPickerI18n.ok = "Ok";
    $ionicPickerI18n.cancel = "Cancelar";
  });
