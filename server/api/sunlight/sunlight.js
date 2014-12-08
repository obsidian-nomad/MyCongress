var http = require('http');
var https = require('https');

var api = {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'congress.api.sunlightfoundation.com',
  transparency: 'transparencydata.org'
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

module.exports.getReps = function(zip, cb){
    var options = {
      hostname: api.sunlight,
      path: '/legislators/locate' + api.key + '&zip=' + zip
    };

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
    })

}

module.exports.getDonors = function (id, cb) {
  
}