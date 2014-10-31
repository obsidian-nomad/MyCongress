angular.module('myCongress.tiles', ['myCongress.services'])

.controller('TileController', function($scope, Politicians, Profile, Donors) {
   Politicians.getReps().then(function(data){
    $scope.bios = data.data.results;
    console.log(data);

    // Set Parties to full name
    var parties = {"D": "Democrat", "R": "Republican", "I": "Independent"}
    for( var rep in $scope.bios ){
      $scope.bios[rep].party = parties[$scope.bios[rep].party];
    }
   });
    // Donors.industries('N00035854').then(function (res) {
    //   console.log(res);
    //   $scope.gg = res;
    // });
});
