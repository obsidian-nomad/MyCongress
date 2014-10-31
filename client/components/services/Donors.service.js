'use strict';

angular.module('myCongress.services')

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
    name = name.toString();
    name = name.replace(/ /g, "+");
    name = name.toString();
    console.log(name);
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

  var _getTopContributorsofPolitician = function (polId) {
    //might have to JSON parse based on old non-ng code
    return $http({
      method:'GET',
      url: api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors.json' + api.key
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('success');
      return data;
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting TOP CONTRIBUTOR Data.');
    });
  };

  var _getTopSectorsofPolitician = function (polId){
    return $http({
      method:'GET',
      url: api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors/sectors.json' + api.key
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('success');
      return data;
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting TOP SECTOR Data.');
    });
  };

  var _getTopIndustriesofPolitician = function(polId){
    return $http({
      method:'GET',
      url: api.transparency + 'api/1.0/aggregates/pol/'+polId+'/contributors/industries.json' + api.key 
    })
    .success(function(data/*, status, headers, config*/) {
      console.log('success');
      return data;
    })
    .error(function(/*data, status, headers, config*/) {
      console.log('Error occured while getting TOP INDUSTRY Data.');
    });
  };
  return {
    getPolitician:_getPolitician,
    getTopIndustriesofPolitician:_getTopIndustriesofPolitician,
    getTopSectorsofPolitician:_getTopSectorsofPolitician,
    getTopContributorsofPolitician:_getTopContributorsofPolitician

  }
});
