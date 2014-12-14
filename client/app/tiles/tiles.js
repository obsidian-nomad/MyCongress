angular.module('myCongress.tiles', ['myCongress.services'])

.controller('TileController', function($scope, Politicians, Sunlight) {
  var parties = {"D": "Democrat", "R": "Republican", "I": "Independent"}
  
   Sunlight.getReps({id: 'all'})
    .$promise
    .then(function(data) {
      $scope.bios = data.results;
      for( rep in $scope.bios ){
        $scope.bios[rep].party = parties[$scope.bios[rep].party];
      }
   })
});
