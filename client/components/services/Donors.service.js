'use strict';

angular.module('myCongress.services')
.constant('api', {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'https://congress.api.sunlightfoundation.com/',
  transparency: 'http://transparencydata.com/'
})
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
