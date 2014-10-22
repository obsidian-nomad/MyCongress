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

	// Query the API to get information about all Congressional Members
	var _getReps = function(params){
	  params = params || {};
	  return $http({
	    method: 'GET',
	    url: '/api/lawmakers',
	    params: params
	  })
	  .success(function(data/*, status, headers, config*/) {
	    console.log('POLITICIANS DATA: ', data);
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
	var _getProfilePictureSrc = function(congressmanId){
		// TODO--> this function should query our API for the picture
		congressmanId = '';
		return 'http://en.wikipedia.org/wiki/Nancy_Pelosi#mediaviewer/File:Nancy_Pelosi_2013.jpg';
	};

	var _getVotingHistory = function(congressmanId){
		 congressmanId = '';
		 // TODO--> query our API endpoints for congressman voting history **RALPH, have this return dummy data for now**
		return {};
	};

	var _getApprovalRating = function(congressmanId){
		congressmanId = '';
		return {approve: 0.56, disapprove: 0.40, abstain: 0.04};
	};

	var _getTwitterFeed = function(congressmanTwitterId){
		return $http({
			method: 'GET',
			url: '/api/twitter/' + congressmanTwitterId
		})
		.success(function(data){
			console.log('Twitter feed data', data[0].user);
			return data;
		})
		.error(function(){
			console.log('error fetching twitter feed for', congressmanTwitterId);
		});
	};

	return {
		getProfilePictureSrc: _getProfilePictureSrc,
		getVotingHistory: _getVotingHistory,
		getApprovalRating: _getApprovalRating,
		getTwitterFeed: _getTwitterFeed
	};
});

