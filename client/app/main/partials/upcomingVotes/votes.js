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
  .controller('upcomingVotesController', function($scope, Bills, Politicians, Profile, Donors) {
    $scope.repVotes = {};
    $scope.sunriseIdToTransparencyId = {};
    $scope.transparencyIdToSunriseId = {};
    $scope.topDonorsByRep = {};

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
        var rep = representatives[i];
        if(rep.title === 'Sen'){
          senators.push(rep);
        } else {
          congressmen.push(rep);
        }
        Donors.getPolitician(rep.first_name + '+' + rep.last_name).then(function(data){
          // console.log('getPolitician data: ', data);
          var transparencyId = data.data[0].id;
          $scope.sunriseIdToTransparencyId[rep.bioguide_id] = transparencyId;
          $scope.transparencyIdToSunriseId[transparencyId] = rep.bioguide_id;

          Donors.getTopIndustriesofPolitician(transparencyId).then(function(data){
            console.log(data.data);
            $scope.topDonorsByRep[this.bioguide_id] = data.data;
            console.log($scope.topDonorsByRep);
          }.bind(this));
        }.bind(rep));
      }
      $scope.reps = senators.concat(congressmen);
    });

  });

