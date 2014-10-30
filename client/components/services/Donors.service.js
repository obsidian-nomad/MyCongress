'use strict';

angular.module('myCongress.services')
.constant('api', {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'https://congress.api.sunlightfoundation.com/',
  transparency: 'http://transparencydata.org/',
  //aggregates/pol/
})
.constant('sectorCodes', {
  A:'Agribusiness',
  B:'Communications/Electronics',
  C:'Construction',
  D:'Defense',
  E:'Energy/Natural Resources',
  F:'Finance/Insurance/Real Estate',
  H:'Health',
  K:'Lawyers and Lobbyists',
  M:'Transportation',
  N:'Misc. Business',
  Q:'Ideology/Single Issue',
  P:'Labor',
  W:'Other',
  Y:'Unknown',
  Z:'Administrative Use'
})
.factory('Donors', function( $http, api ) {
  var _getPolitician = function(name){
    //replace spaces with + so it won't break api call
    name.replace(/ /g, "+");
    return $http({
      method:'GET',
      url: api.transparency + 'api/1.0/entities.json' + api.key + '&type=politician&search=' + name
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('success');
      console.log('GET POLITICIAN DATA:', data);
      return data;
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting POLITICIAN Data.');
    });
  };
  var getDonorKey = function (request) {
    //might have to JSON parse based on old non-ng code
    console.log('GETTING DONOR KEY');
    var key = request[0].id;
    return key;
  };
  var _getTopContributorsofPolitician = function (polId) {
    //might have to JSON parse based on old non-ng code
    return $http({
      method:'GET',
      url: api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors.json' + api.key + '&type=politician&search=' + name
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('success');
      console.log('GET TOP CONTRIBUTOR DATA:', data);
      return data;
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting TOP CONTRIBUTOR Data.');
    });
  };

  var _getTopSectorsofPolitician = function (polId){
    return $http({
      method:'GET',
      url: api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors/sectors.json' + api.key + '&type=politician&search=' + name
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('success');
      console.log('GET TOP SECTOR DATA:', data);
      return data;
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting TOP SECTOR Data.');
    });
  };

  var _getTopIndustriesofPolitician = function(polId){
    return $http({
      method:'GET',
      url: api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors/industries.json' + api.key + '&type=politician&search=' + name
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('success');
      console.log('GET TOP INDUSTRY DATA:', data);
      return data;
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting TOP INDUSTRY Data.');
    });
  };
  return {
    getTopIndustriesofPolitician:_getTopIndustriesofPolitician,
    getPolitician:_getPolitician,
    getTopSectorsofPolitician:_getTopSectorsofPolitician,
    getTopContributorsofPolitician:_getTopContributorsofPolitician,
    
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
