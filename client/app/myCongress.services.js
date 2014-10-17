angular.module('myCongress.services', [])

.factory( 'Politicians', function( $http ) {
	var _getBills = function(){
		  return $http({
		    method: 'GET',
		    url: 'congress.api.sunlightfoundation.com/bills?apikey=d5ac2a8391d94345b8e93d5c69dd8739'
		  })
		  .success(function(data, status, headers, config) {
		    return data;
		  })
		  .error(function(data, status, headers, config) {
		    console.log('Error occured while getting Bill Data.');
		  });
	}

	var _getVotes = function(){
		return $http({
		    method: 'GET',
		    url: 'congress.api.sunlightfoundation.com/votes?apikey=d5ac2a8391d94345b8e93d5c69dd8739'
		  })
		  .success(function(data, status, headers, config) {
		    return data;
		  })
		  .error(function(data, status, headers, config) {
		    console.log('Error occured while getting Vote Data.');
		  });
	}


	return {
		getBills: _getBills
	}
});