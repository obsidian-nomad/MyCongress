/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sunlight/:id          ->  show
 */

'use strict';
var _ = require('lodash');
var requestData = require('./sunlight').requestData;

var api = {
  key: '?apikey=d5ac2a8391d94345b8e93d5c69dd8739',
  sunlight: 'congress.api.sunlightfoundation.com',
  transparency: 'transparencydata.com'
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

// Get lawmaker profile by bioguide_id
exports.getProfile = function(req, res) {
  var id = req.params.id;
  var options = {
    hostname: api.sunlight,
    path: '/legislators' + api.key + '&all_legislators=true&bioguide_id=' + id
  };

  requestData(options, function(profile){
    if (!profile) {
      handleError(res, 'Cannot getProfile');
    }
    res.json(200, profile); 
  });
};

// Get lawmakers 
exports.getReps = function(req, res) {

  // get reps by zipcode
  if (!_.isNaN(parseInt(req.params.id))) {
    var zipCode = req.params.id;
    var options = {
      hostname: api.sunlight,
      path: '/legislators/locate' + api.key + '&zip=' + zipCode
    };
  // get all reps
  } else if ( req.params.id === 'all') {
    var options = {
      hostname: api.sunlight,
      path: '/legislators' + api.key + '&per_page=all',
    };
  }
  requestData(options, function(reps){
    if (!reps) {
      handleError(res, 'Cannot getReps');
    }
    res.json(200, reps); 
  });
};

// Get transparencydata donor ID with rep name (first+last)
exports.getDonorId = function (req, res) {
  var name = req.params.id;
  var options = {
    hostname: api.transparency,
    path: '/api/1.0/entities.json' + api.key + '&type=politician&search=' + name
  };

  requestData(options, function(rep){
    var id;
      _.each(rep, function (rep) {
        if (_.contains(rep.seat, 'federal:house') || _.contains(rep.seat, 'federal:senate')) {
          id = rep.id;
        }
      });
    if (!id) {
      handleError(res, 'Cannot getDonorId');
    }
    res.status(200).send({id: id}); 
  });
};

exports.getTopDonors = function (req, res) {
  var transparencyId = req.params.id;
  var options = {
    hostname: api.transparency,
    path: '/api/1.0/aggregates/pol/'+ transparencyId + '/contributors.json' + api.key
  };

  requestData(options, function (donors) {
    if (!donors) {
      handleError(res, 'Cannot getTopDonors');
    }
    res.status(200).send({donors: donors}); 
  });
};

exports.getTopSectors = function (req, res) {
  var transparencyId = req.params.id;
  var options = {
    hostname: api.transparency,
    path: '/api/1.0/aggregates/pol/'+transparencyId+'/contributors/sectors.json' + api.key
  };

  requestData(options, function (sectors) {
    if (!sectors) {
      handleError(res, 'Cannot getTopSectors');
    }
    res.status(200).send({sectors: sectors}); 
  });
};

exports.getTopIndustries = function (req, res) {
  var transparencyId = req.params.id;
  var options = {
    hostname: api.transparency,
    path: '/api/1.0/aggregates/pol/'+transparencyId+'/contributors/industries.json' + api.key 
  };

  requestData(options, function (industries) {
    if (!industries) {
      handleError(res, 'Cannot getTopIndustries');
    }
    res.status(200).send({industries: industries}); 
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
