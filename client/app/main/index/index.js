angular.module('myCongress.home', ['myCongress.services'])

.controller('ZipController', function($scope, Politicians) {
  $scope.zipSearch = Politicians.getRepsByZip;
});
