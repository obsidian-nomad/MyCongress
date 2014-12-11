var http = require('http');
var api = {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'congress.api.sunlightfoundation.com',
  transparency: 'transparencydata.com'
};
var sectorCodes = {
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
};

module.exports.requestReps = function(zip, cb){
  var options = {
    hostname: api.sunlight,
    path: '/legislators/locate' + api.key + '&zip=' + zip
  };
  console.log('Request Reps', options);

  var request = http.get(options, function (result) {
    var buffer = '';
    result.setEncoding('utf8');
    result.on('data', function (data) {
      buffer += data;
    });
    result.on('end', function () {
      var reps = JSON.parse(buffer);
      if (cb) {
        cb(reps);
      }
    });
  });

  request.on('error', function(e) {
    console.log('it broke at getReps with', e);
  });
};

module.exports.requestDonorId = function(name, cb) {
  var options = {
    hostname: api.transparency,
    path: '/api/1.0/entities.json' + api.key + '&type=politician&search=' + name
  };

  var request = http.get(options, function (result) {
    var buffer = '';
    result.setEncoding('utf8');
    result.on('data', function (data) {
      buffer += data;
    });
    
    result.on('end', function () {
      var id = JSON.parse(buffer);
      if (cb) {
        cb({ result: id });
      }
    });
  });

  request.on('error', function(e) {
    console.log('it broke at getDonorId with', e);
  });
  // request.end();
}

// var _getPolitician = function(name){
//     //replace spaces with + so it won't break api call
//     name = name.toString();
//     name = name.replace(/ /g, "+");
//     name = name.toString();
//     return $http({
//       method: 'GET',
//       url: api.transparency + 'api/1.0/entities.json' + api.key + '&type=politician&search=' + name
//     })
//     .success(function(data/*, status, headers, config*/) {
//       console.log('GET POLITICIAN DATA:', data);
//       return data;
//     })
//     .error(function(data, status, headers, config) {
//       console.log('Error occured while getting POLITICIAN Data.');
//     });
//   };