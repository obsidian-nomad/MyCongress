'use strict';

angular.module('myCongress.services')

.factory( 'Sunlight', function( $resource, api ) {
 
  return $resource('api/sunlight/:id/:controller', {id: 'id'},
  {
    getRepsByZip: {
      method: 'GET'
    }
  });
});


      // get: {
      //   method: 'GET',
      //   params: {
      //     id:'me'
      //   }
      // }