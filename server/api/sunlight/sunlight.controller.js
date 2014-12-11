/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sunlight/:id          ->  show
 */

'use strict';
var requestReps = require('./sunlight').requestReps;
var requestDonorId = require('./sunlight').requestDonorId;

// Get lawmakers by zipcode
exports.getRepsByZip = function(req, res) {
  var forZip = req.params.id;
  requestReps(forZip, function(reps){
    if (!reps) {
      handleError(res, 'Cannot getRepsByZip');
    }
    res.json(200, reps); 
  });
};

// Get transparencydata donor ID
exports.getDonorId = function (req, res) {
  var forName = req.params.id;
  requestDonorId(forName, function(id){
    // console.log('controllerID', id);
    if (!id) {
      handleError(res, 'Cannot getDonorId');
    }
    res.status(200).send(id); 
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
