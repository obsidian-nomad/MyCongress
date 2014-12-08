/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sunlight/:id          ->  show
 */

'use strict';
var $q = require('q');
var getReps = require('./sunlight').getReps;

// Get lawmakers by zipcode
exports.getRepsByZip = function(req, res) {
  var forZip = req.params.id;
  getReps(forZip)
};

