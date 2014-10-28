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
var Lawmaker = require('./lawmaker.model');

// Get list of lawmakers
exports.index = function(req, res) {
  console.log('lawmaker - index');
  Lawmaker.find(function (err, lawmakers) {
    if(err) { return handleError(res, err); }
    return res.json(200, lawmakers);
  });
};

// Get a single lawmaker
exports.show = function(req, res) {
  console.log('lawmaker - show');

  Lawmaker.findOne({bioguide_id: req.params.id}, function (err, lawmaker) {
    if(err) { return handleError(res, err); }
    if(!lawmaker) { return res.send(404); }
    return res.json(lawmaker);
  });
};

// Creates a new lawmaker in the DB.
exports.create = function(req, res) {
  console.log('lawmaker - create');

  Lawmaker.create(req.body, function (err, lawmaker) {
    if(err) { return handleError(res, err); }
    return res.json(201, lawmaker);
  });
};

// Updates an existing lawmaker in the DB.
exports.update = function(req, res) {
  console.log('lawmaker - update');

  if(req.body._id) { delete req.body._id; }
  Lawmaker.findById(req.params.id, function (err, lawmaker) {
    if (err) { return handleError(res, err); }
    if(!lawmaker) { return res.send(404); }
    var updated = _.merge(lawmaker, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, lawmaker);
    });
  });
};

// Deletes a lawmaker from the DB.
exports.destroy = function(req, res) {
  console.log('lawmaker - destroy');

  Lawmaker.findById(req.params.id, function (err, lawmaker) {
    if(err) { return handleError(res, err); }
    if(!lawmaker) { return res.send(404); }
    lawmaker.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  console.log('lawmaker - error');

  return res.send(500, err);
}