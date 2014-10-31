angular.module('myCongress.home', ['myCongress.services'])

.controller('HomeController', function($scope, $controller, $location) {
  // var upcomingVotes = $controller('upcomingVotes');
  $scope.zipSearch = function(){
  	// Politicians.getRepsByZip($scope.zip);
  	// upcomingVotes.updateViewByZip($scope.zip);
  	$location.path('/upcomingVotes/' + $scope.zip);
  	// $scope.$emit('updateZip', $scope.zip);
  };
  console.log('Init?');
});
