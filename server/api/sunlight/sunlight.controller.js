/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sunlight/:id          ->  show
 */

'use strict';
// var $q = require('q');
var getReps = require('./sunlight').getReps;
var getDonors = require('./sunlight').getDonors;

// Get lawmakers by zipcode
exports.getRepsByZip = function(req, res) {
  var forZip = req.params.id;
  getReps(forZip, function(reps){
    if (!reps) {
      handleError(res, 'Cannot getRepsByZip');
    }
    res.json(200, reps); 
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
