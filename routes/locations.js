const express = require('express');
const {
  getLocations,
  getLocation,
  createLocation
} = require('../controllers/locations');

const Location = require('../models/Location');

const router = express.Router();

router.route('/')
  .get(getLocations)
  .post(createLocation)

router.route('/:id')
  .get(getLocation);

module.exports = router