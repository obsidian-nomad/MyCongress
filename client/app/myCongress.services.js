'use strict';

angular.module('myCongress.services', [])
.constant('api', {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'https://congress.api.sunlightfoundation.com/',
  transparency: 'http://transparencydata.com/'
})
.factory( 'Bills', function( $http ) {
  //Get Bills will return all bill objects from the bill API 
  var _getBills = function(params){
    params = params || {};
    return $http({
      method: 'GET',
      url: api.sunlight + 'bills' + api.key,
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

  var _getUpcomingBills = function(){
    return $http({
      method: 'GET',
      url: api.sunlight + 'upcoming_bills' + api.key + '&order=scheduled_at',
      // url: '/api/lawmakers/' + id,
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('UPCOMING BILLS DATA: ', data);
      // return data.results[0]; PROMISES DO NOT NEED TO BE RETURNED
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting Upcoming Bills Data.');
    });
  };

  var _getVotes = function(params){
    params = params || {};
    return $http({
      method: 'GET',
      url: api.sunlight + 'votes' + api.key,
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

/* REFACTOR THE FOLLOWING TO USE API INSTEAD OF DATABASE */
.factory( 'Politicians', function( $http, api ){

  // Query the API to get information about all Congressional Members
  var _getReps = function(params){
    params = params || {};
    return $http({
      method: 'GET',
      url: api.sunlight + 'legislators' + api.key + '&per_page=all',
      // url: '/api/lawmakers',
      params: params
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('POLITICIANS DATA: ', data.results);
      return data;
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting Vote Data.');
    });
  };
  var _getRep = function(id){
    id = id || {};
    console.log('_getRep ID',id);
    return $http({
      method: 'GET',
      url: api.sunlight + 'legislators' + api.key + '&all_legislators=true&bioguide_id=' + id,
      // url: '/api/lawmakers/' + id,
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('POLITICIAN DATA: ', data.results[0]);
      // return data.results[0];
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting Vote Data.');
    });
  };

  return {
    getReps: _getReps,
    getRep: _getRep
  };
})
// Here, we will include logic to access relevant information for each congressman's profile
.factory( 'Profile', function( $http ){
  var _getProfilePictureSrc = function(congressmanId){
    // TODO--> this function should query our API for the picture
    congressmanId = '';

    return 'http://en.wikipedia.org/wiki/Nancy_Pelosi#mediaviewer/File:Nancy_Pelosi_2013.jpg';
  };

  //Get a congressman's most recent votes
  var _getVotingHistory = function(congressmanId){
    return $http({
      method: 'GET',
      url: api.sunlight + 'votes' + api.key + '&voter_ids.' + congressmanId + '__exists=true&order=voted_at',
      // url: '/api/lawmakers/' + id,
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('VOTE DATA: ', data);
      // return data.results[0]; PROMISES DO NOT NEED TO BE RETURNED
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting Vote Data.');
    });
  };

  //not sure where to get this, just yet
  var _getApprovalRating = function(congressmanId){
    congressmanId = '';
    return {approve: 0.56, disapprove: 0.40, abstain: 0.04};
  };

  // Creates a helper function makes a GET request to our server's twitter API
  var _getTwitterFeed = function(congressmanTwitterId){
    return $http({
      method: 'GET',
      url: '/api/twitter/' + congressmanTwitterId
    })
    .success(function(data){
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
})

.directive('fallbackSrc', function () {
  return {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
    }
  }
});

.factory('Donors', function( $http, api ) {
  var getDonorKey = function (request) {
    //might have to JSON parse based on old non-ng code
    console.log('GETTING DONOR KEY');
    var key = request[0].id;
    return key;
  };
  var getTopIndustries = function (request) {
    //might have to JSON parse based on old non-ng code
    var industries = request;
    return industries;
  };
  return {
    industries: function (id) { // id is the legislators crp_id from sunlight
      $http({
       method: 'GET',
       url: api.transparency + 'api/1.0/entities/id_lookup.json?namespace=urn%3Acrp%3Arecipient&id=' + id + api.key,
     })
      .success(getDonorKey)
      .error(function (data, status) {
        console.log('in here!')
        console.error(status, ':', data);
      })
      .then(function (key) {
       $http({
         method: 'GET',
         url: api.transparency + 'api/1.0/aggregates/pol' + key + '/contributors/industries.json' + api.key,
       })
       .success(getTopIndustries)
       .error(function (data, status) {
        console.error(status, ':', data);
      })
     });
    },
    individuals: function (id) {
    }
  }
});
