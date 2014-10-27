angular.module('myCongress.tiles', ['myCongress.services'])

.controller('TileController', function($scope, Politicians, Profile) {
   Politicians.getReps().then(function(data){
    $scope.bios = data.data;
   });

});