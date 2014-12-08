var http = require('http');
var https = require('https');

var api = {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'congress.api.sunlightfoundation.com',
  transparency: 'transparencydata.org'
};

module.exports.getReps = function(zip, cb){

    var options = {
      hostname: api.sunlight,
      path: '/legislators/locate' + api.key + '&zip=' + zip
    };

    http.get(options, function (result) {
      var buffer = '';
      result.setEncoding('utf8');
      result.on('data', function (data) {
        buffer += data;
      });
      result.on('end', function () {
        var reps = JSON.parse(buffer);
        console.log('REPS', reps)
        cb(reps);
      });
    });

}

  //   return $http({
  //     method: 'GET',
  //     url: api.sunlight + 'legislators/locate' + api.key + '&zip=' + zip,
  //     // url: '/api/lawmakers/' + id,
  //   })
  //   .success(function(data/*, status, headers, config*/) {
  //     console.log('POLITICIAN DATA BY ZIP: ', data);
  //     return data;
  //   })
  //   .error(function(/*data, status, headers, config*/) {
  //     console.log('Error occured while getting POLITICIAN DATA BY ZIP.');
  //   });
  // };