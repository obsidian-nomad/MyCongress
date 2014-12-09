'use strict';

var express = require('express');
var controller = require('./sunlight.controller');

var router = express.Router();

router.get('/:id', controller.getRepsByZip);
router.get('/:id/donorId', controller.getDonorId);

module.exports = router;