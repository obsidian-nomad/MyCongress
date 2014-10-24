/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /twitter/:id          ->  show
 */

'use strict';

var twitter = require('./twitter').twitter;

// Get a single lawmaker
exports.show = function(req, res) {
  var congresspersonID = req.params.id;
  twitter( congresspersonID, function(tweets){
    res.json(tweets); 
  });
};

function handleError(res, err) {
  return res.send(500, err);
}