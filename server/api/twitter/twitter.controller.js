/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /lawmakers              ->  index
 * POST    /lawmakers              ->  create
 * GET     /lawmakers/:id          ->  show
 * PUT     /lawmakers/:id          ->  update
 * DELETE  /lawmakers/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var twitter = require('./twitter').twitter;

// Get a single lawmaker
exports.show = function(req, res) {
  var congresspersonID = req.params.id;
  twitter( congresspersonID, function(tweets){
    res.json(tweets); 
  });
};

  // Thing.findById(req.params.id, function (err, thing) {
  //   if(err) { return handleError(res, err); }
  //   if(!thing) { return res.send(404); }
  //   return res.json(thing);
  // });

function handleError(res, err) {
  return res.send(500, err);
}