'use strict';
// Line 3 instantiates the myCongress.services module!
angular.module('myCongress.services', [])

.constant('api', {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'https://congress.api.sunlightfoundation.com/',
  transparency: 'http://transparencydata.com/'
})
.factory( 'Bills', function( $http, api ) {
  //Get Bills will return all bill objects from the bill API 
  var _getBills = function(params){
    params = params || {};
    return $http({
      method: 'GET',
      url: api.sunlight + 'bills' + api.key + '&order=scheduled_at',
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

  var _getUpcomingBills = function(params){
    params = params || {};
    return $http({
      method: 'GET',
      url: api.sunlight + 'upcoming_bills' + api.key + '&order=scheduled_at',
      // url: '/api/lawmakers/' + id,
      params:params
    })
    .success(function(data/*, status, headers, config*/) {
      // return data.results[0]; PROMISES DO NOT NEED TO BE RETURNED
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting Upcoming Bills Data.');
    });
  };

  var _getVotes = function(params){
    // params = params || {};
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
    getVotes: _getVotes,
    getUpcomingBills: _getUpcomingBills
  };
})
