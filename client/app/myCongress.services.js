'use strict';

angular.module('myCongress.services', [])

.factory( 'Bills', function( $http ) {


	//Get Bills will return all bill objects from the bill API 
	var _getBills = function(params){
	  params = params || {};
	  return $http({
	    method: 'GET',
	    url: 'https://congress.api.sunlightfoundation.com/bills?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
	    params: params
	  })
	  .success(function(data/*, status, headers, config*/) {
	    console.log('success');
	    console.log('BILLS DATA:', data);
	    return data;
	  })
	  .error(function(/*data, status, headers, config*/) {
	    console.log('Error occured while getting Bill Data.');
	  });
	};

	var _getVotes = function(params){
	  params = params || {};
	  return $http({
	    method: 'GET',
	    url: 'https://congress.api.sunlightfoundation.com/votes?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
	    params: params
	  })
	  .success(function(data/*, status, headers, config*/) {
	    console.log('success');
	    return data;
	  })
	  .error(function(/*data, status, headers, config*/) {
	    console.log('Error occured while getting Vote Data.');
	  });
	};


	return {
		getBills: _getBills,
		getVotes: _getVotes
	};
})
.factory( 'Politicians', function( $http ){

	var _getReps = function(params){
	  params = params || {};
	  return $http({
	    method: 'GET',
	    url: 'https://congress.api.sunlightfoundation.com/legislators?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
	    params: params
	  })
	  .success(function(data/*, status, headers, config*/) {
	    console.log('success');
	    return data;
	  })
	  .error(function(/*data, status, headers, config*/) {
	    console.log('Error occured while getting Vote Data.');
	  });
	};


	return {
		getReps: _getReps
	};
})
// Here, we will include logic to access relevant information for each congressman's profile
.factory( 'Profile', function( $http ){

});

