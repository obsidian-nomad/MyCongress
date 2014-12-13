'use strict';

angular.module('myCongress.services')

.factory( 'Sunlight', function( $resource, api ) {
  return $resource('api/sunlight/:id/:controller', {id: 'id'},
  {
    getProfile: {
      method: 'GET',
      params: {
        controller: 'profile'
      }
    },    
    getReps: {
      method: 'GET'
    },
    getDonorId: {
      method: 'GET',
      params: {
        controller: 'donorId'
      }
    },
    getTopDonors: {
      method: 'GET',
      params: {
        controller: 'topDonors'
      }
    },
    getTopSectors: {
      method: 'GET',
      params: {
        controller: 'topSectors'
      }
    },
    getTopIndustries: {
      method: 'GET',
      params: {
        controller: 'topIndustries'
      }
    }
  });
});
