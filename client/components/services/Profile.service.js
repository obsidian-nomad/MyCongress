'use strict';

angular.module('myCongress.services')
.constant('api', {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'https://congress.api.sunlightfoundation.com/',
  transparency: 'http://transparencydata.com/'
})
// Here, we will include logic to access relevant information for each congressman's profile
.factory( 'Profile', function( $http, api ){
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
