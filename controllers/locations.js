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
    res.status(200).json({
      success: true,
      data: location
    });
  } catch (error) {
    next(error);
  }
};

//@desc       Create location
//@route      POST /api/v1/locations
//@access     Private
exports.createLocation = async (req, res, next) => {
  try {
    const location = await Location.create(req.body)
    res.status(201).json({
      success: true,
      data: location
    });
  } catch (error) {
    next(error);
  }
};

//@desc       Update location
//@route      PUT /api/v1/locations/:id
//@access     Private
exports.updateLocation = async (req, res, next) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (location) {
      res.status(200).json({
        success: true,
        data: location
      });
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

//@desc       Delete location
//@route      Delete /api/v1/locations/:id
//@access     Private
exports.deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (location) {
      res.status(200).json({
        success: true
      });
    } else {
      res.status(404).send(`Could not find location with an Id: ${req.params.id}`);
    }
  } catch (error) {
    next(error);
  }
};