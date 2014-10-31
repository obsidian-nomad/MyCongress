angular.module('myCongress.home', ['myCongress.services'])

.controller('HomeController', function($scope, Politicians, $location) {
  $scope.zipSearch = Politicians.getRepsByZip;
});
