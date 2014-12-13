'use strict';

angular.module('myCongressApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myReps', {
        url: '/my-reps/:zip',
        templateUrl: 'app/main/partials/upcomingVotes/votes.html',
        controller: 'myRepsController'
      });
  })

  .filter('sectorNameConversion', function(sectorCodes) {
    return function(input) {
      return sectorCodes[input];
    };
  })

  .controller('myRepsController', function($scope, $stateParams, Sunlight) {
    $scope.sunriseIdToTransparencyId = {};
    $scope.transparencyIdToSunriseId = {};
    $scope.topDonorsByRep = {};
    $scope.topIndustriesByRep = {};
    $scope.topSectorsByRep = {};
    $scope.zip = $stateParams.zip;

    Sunlight.getReps({id: $scope.zip})
    .$promise
    .then(function (data) {
      var reps = data.results;
      var senators = [];
      var congressmen = [];

      // Order by Senators first
      angular.forEach(reps, function (rep) {
        if(rep.title === 'Sen'){
          senators.push(rep);
        } else {
          congressmen.push(rep);
        }
        var name = rep.first_name + '+' + rep.last_name;
        
        Sunlight.getDonorId({id: name})
        .$promise
        .then(function (result) {

          Sunlight.getTopDonors({id: result.id})
          .$promise
          .then(function (data) {
            $scope.topDonorsByRep[this.bioguide_id] = data.donors;
          }.bind(this));

          Sunlight.getTopSectors({id: result.id})
          .$promise
          .then(function (data) {
            $scope.topSectorsByRep[this.bioguide_id] = data.sectors;
          }.bind(this));

          Sunlight.getTopIndustries({id: result.id})
          .$promise
          .then(function (data) {
            $scope.topIndustriesByRep[this.bioguide_id] = data.industries;
          }.bind(this));

        }.bind(rep));
      });
      $scope.reps = senators.concat(congressmen);
    });
  });

    // Politicians.getRepsByZip($scope.zip).then(function(data){
    //   var representatives = data.data.results;
    //   var senators = [];
    //   var congressmen = [];

    //   //Order by Senators first
    //   for(var i=0; i<representatives.length; i++){
    //     var rep = representatives[i];

    //     if(rep.title === 'Sen'){
    //       senators.push(rep);
    //     } else {
    //       congressmen.push(rep);
    //     }
    //     console.log(rep.first_name + '+' + rep.last_name);
    //     Donors.getPolitician(rep.first_name + '+' + rep.last_name).then(function(data){
    //       console.log('getPolitician data: ', data);
    //       var transparencyId = data.data[0].id;
    //       $scope.sunriseIdToTransparencyId[rep.bioguide_id] = transparencyId;
    //       $scope.transparencyIdToSunriseId[transparencyId] = rep.bioguide_id;

    //       Donors.getTopContributorsofPolitician(transparencyId).then(function(data){
    //         console.log('top contrib', data.data);
    //         $scope.topDonorsByRep[this.bioguide_id] = data.data;
    //         console.log($scope.topDonorsByRep);
    //       }.bind(this));

    //       Donors.getTopSectorsofPolitician(transparencyId).then(function(data){
    //         console.log('top sector ', data.data);
    //         $scope.topSectorsByRep[this.bioguide_id] = data.data;
    //         console.log($scope.topDonorsByRep);
    //       }.bind(this));

    //       Donors.getTopIndustriesofPolitician(transparencyId).then(function(data){
    //         console.log('top industry ', data.data);
    //         $scope.topIndustriesByRep[this.bioguide_id] = data.data;
    //         console.log($scope.topDonorsByRep);
    //       }.bind(this));

    //     }.bind(rep));
    //   }
    //   $scope.reps = senators.concat(congressmen);
    //   });

