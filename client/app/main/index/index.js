angular.module('myCongress.home', ['myCongress.services'])

.controller('HomeController', function($scope, Politicians) {
  $scope.zipSearch = Politicians.getRepsByZip;
  $scope.yo = 5;
});
