'use strict';

angular.module('myCongressApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upcomingVotes', {
        url: '/upcomingVotes',
        templateUrl: 'app/main/partials/upcomingVotes/votes.html',
        controller: 'upcomingVotesController'
      });
  })

  //uistateref to add multiple or duplicate partials to a page
  .controller('upcomingVotesController', function($scope, Bills, Politicians) {
    Bills.getUpcomingBills().then(function(data){
      var bills = data.data.results;
      $scope.upcomingBills = bills;
    });

    Politicians.getRepsByZip('01085').then(function(data){
      $scope.reps = data.data.results;
      console.log(data.data.results);
    });
  });

