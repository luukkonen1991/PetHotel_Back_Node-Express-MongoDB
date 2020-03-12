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

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), locationPhotoUpload);

router.route('/')
  .get(advancedResults(Location), getLocations)
  .post(protect, authorize('publisher', 'admin'), createLocation);

router.route('/:id')
  .get(getLocation)
  .put(protect, authorize('publisher', 'admin'), updateLocation)
  .delete(protect, authorize('publisher', 'admin'), deleteLocation);

module.exports = router;