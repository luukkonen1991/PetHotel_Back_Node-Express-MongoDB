const express = require('express');
const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
  locationPhotoUpload
} = require('../controllers/locations');

const Location = require('../models/Location');

const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/:id/photo')
  .put(locationPhotoUpload);

router.route('/')
  .get(advancedResults(Location), getLocations)
  .post(createLocation);

router.route('/:id')
  .get(getLocation)
  .put(updateLocation)
  .delete(deleteLocation);

module.exports = router;