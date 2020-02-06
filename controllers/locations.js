// const asyncHandler = require('../middleware/async');
const Location = require('../models/Location');


//@desc       Get all locations
//@route      GET /api/v1/locations
//@access     Public
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    next(error)
  }
};