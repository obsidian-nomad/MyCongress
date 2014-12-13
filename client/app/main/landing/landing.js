angular.module('myCongress.home', ['myCongress.services'])

.controller('HomeController', function($scope, $controller, $location) {
  $scope.zipSearch = function(){
  	$location.path('/my-reps/' + $scope.zip);
  };
});
