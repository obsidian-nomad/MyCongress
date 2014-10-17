'use strict';

angular.module('myCongressApp', [
  'myCongress.services',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $stateProvider
    // used to test what data we're pulling from the server
    .state('/test', {
      url: '/test',
      templateUrl: '/app/test.html'
    })
    // See angular parameter documentation here: https://github.com/angular-ui/ui-router/wiki/URL-Routing
    .state('/profiles/{repId}', {
      url: 'profiles/:repId',
      templateUrl: '/app/main/repProfile.html'
    });
    
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })
  .controller('dataController', function($scope, Bills, Politicians) {
    Bills.getBills().then(function(data){
      $scope.bills = data;
    });

    Bills.getVotes().then(function(data){
      $scope.votes = data;
    });
    //example of parameters passed into the function call
    Politicians.getReps({'first_name': 'Adam', 'last_name': 'Schiff'}).then(function(data){
      $scope.reps = data;
    });
  })
  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });