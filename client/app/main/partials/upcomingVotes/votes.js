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
      var representatives = data.data.results;
      var senators = [];
      var congressmen = [];

      //Order by Senators first
      for(var i=0; i<representatives.length; i++){
        if(representatives[i].title === 'Sen'){
          senators.push(representatives[i]);
        } else {
          congressmen.push(representatives[i]);
        }
      }
      $scope.reps = senators.concat(congressmen);
    });
  });

