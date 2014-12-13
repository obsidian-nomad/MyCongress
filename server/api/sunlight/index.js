'use strict';

var express = require('express');
var controller = require('./sunlight.controller');

var router = express.Router();

router.get('/:id', controller.getReps);
router.get('/:id/profile', controller.getProfile);
router.get('/:id/donorId', controller.getDonorId);
router.get('/:id/topDonors', controller.getTopDonors);
router.get('/:id/topSectors', controller.getTopSectors);
router.get('/:id/topIndustries', controller.getTopIndustries);

module.exports = router;