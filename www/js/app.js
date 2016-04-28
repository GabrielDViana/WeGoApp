angular.module('starter', ['ionic','firebase','ngCordova','ngResource'])

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
      controller: 'MainController'
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
      ;
  $urlRouterProvider.otherwise("app/home");
})

.controller("MainController", ['$scope', '$ionicSideMenuDelegate', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
}])
