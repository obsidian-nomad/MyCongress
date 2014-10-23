'use strict';

var express = require('express');
var controller = require('./twitter.controller');

var router = express.Router();

// One route to access twitter info by politician's twitter handle
router.get('/:id', controller.show);

module.exports = router;