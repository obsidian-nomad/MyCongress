/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /legislators              ->  index
 * POST    /legislators              ->  create
 * GET     /legislators/:id          ->  show
 * PUT     /legislators/:id          ->  update
 * DELETE  /legislators/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Legislator = require('./legislator.model');

// Get list of legislators
exports.index = function(req, res) {
  Legislator.find(function (err, legislators) {
    if(err) { return handleError(res, err); }
    return res.json(200, legislators);
  });
};

// Get a single legislator
exports.show = function(req, res) {
  Legislator.findOne({bioguide_id: req.params.id}, function (err, legislator) {
    if(err) { return handleError(res, err); }
    if(!legislator) { return res.send(404); }
    return res.json(legislator);
  });
};

// Creates a new legislator in the DB.
exports.create = function(req, res) {
  Legislator.create(req.body, function (err, legislator) {
    if(err) { return handleError(res, err); }
    return res.json(201, legislator);
  });
};

// Updates an existing legislator in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Legislator.findById(req.params.id, function (err, legislator) {
    if (err) { return handleError(res, err); }
    if(!legislator) { return res.send(404); }
    var updated = _.merge(legislator, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, legislator);
    });
  });
};

// Deletes a legislator from the DB.
exports.destroy = function(req, res) {
  Legislator.findById(req.params.id, function (err, legislator) {
    if(err) { return handleError(res, err); }
    if(!legislator) { return res.send(404); }
    legislator.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}