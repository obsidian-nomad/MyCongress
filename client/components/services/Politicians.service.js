'use strict';

angular.module('myCongress.services')
.constant('api', {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'https://congress.api.sunlightfoundation.com/',
  transparency: 'http://transparencydata.com/'
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