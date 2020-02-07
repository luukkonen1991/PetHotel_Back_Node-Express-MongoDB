// const asyncHandler = require('../middleware/async');
const Location = require('../models/Location');


//@desc       Get all locations
//@route      GET /api/v1/locations
//@access     Public
exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();
    res.status(200).json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (error) {
    next(error)
  }
};

//@desc       Get single location
//@route      GET /api/v1/locations/:id
//@access     Public
exports.getLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(400).json({
        success: false
      });
    }
    return res.status(200).json({
      success: true,
      data: location
    });
  } catch (error) {
    next(error);
  }
}