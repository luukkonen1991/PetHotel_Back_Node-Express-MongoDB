const express = require('express');
const {
  getLocations
} = require('../controllers/locations');

const Location = require('../models/Location');

const router = express.Router();

router.route('/')
  .get(getLocations);


module.exports = router