const express = require('express');
const {
  getLocations,
  getLocation
} = require('../controllers/locations');

const Location = require('../models/Location');

const router = express.Router();

router.route('/')
  .get(getLocations);

router.route('/:id')
  .get(getLocation);

module.exports = router