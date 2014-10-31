'use strict';
angular.module('myCongressApp', [
  'myCongress.services',
  'myCongress.tiles',
  'myCongress.home',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/welcome');
    // $httpProvider.interceptors.push('authInterceptor');
      // See angular parameter documentation here: https://github.com/angular-ui/ui-router/wiki/URL-Routing
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('profiles', {
        url: '/profiles/:id',
        templateUrl: 'app/main/profile/profile.html',
        controller: 'profileController'
      })
     .state('browse', {
        url: '/browse',
        templateUrl: 'app/tiles/tiles.html',
        controller: 'TileController'
      })
     .state('welcome', {
        url: '/welcome',
        templateUrl: 'app/main/landing/landing.html',
        controller: 'HomeController'
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
