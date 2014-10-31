angular.module('myCongress.tiles', ['myCongress.services'])

.controller('ZipController', function($scope, Politicians) {
  $scope.zipSearch = Politicians.getRepsByZip;
});
