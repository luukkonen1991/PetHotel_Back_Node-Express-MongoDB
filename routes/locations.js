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

const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/:id/photo')
  .put(protect, locationPhotoUpload);

router.route('/')
  .get(advancedResults(Location), getLocations)
  .post(protect, createLocation);

router.route('/:id')
  .get(getLocation)
  .put(protect, updateLocation)
  .delete(protect, deleteLocation);

module.exports = router;