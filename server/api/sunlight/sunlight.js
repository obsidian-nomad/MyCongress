var http = require('http');

module.exports.requestData = function(options, cb){
  var request = http.get(options, function (result) {
    var buffer = '';
    result.setEncoding('utf8');
    result.on('data', function (data) {
      buffer += data;
    });
    result.on('end', function () {
      if (buffer) {
        var response = JSON.parse(buffer);
      }
      if (cb) {
        cb(response);
      }
    });
  });
};
