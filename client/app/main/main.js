'use strict';

angular.module('myCongressApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('test', {
        url: '/test',
        templateUrl: '/app/test.html'
      })
      // See angular parameter documentation here: https://github.com/angular-ui/ui-router/wiki/URL-Routing
      .state('/profiles/{repId}', {
        url: 'profiles/:repId',
        templateUrl: '/app/main/repProfile.html'
      })
      .state('browse', {
        url: '/browse',
        templateUrl: '/app/main/browse.html'
      });
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
  });