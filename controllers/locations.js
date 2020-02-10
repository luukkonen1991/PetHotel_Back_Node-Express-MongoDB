const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Location = require('../models/Location');


//@desc       Get all locations
//@route      GET /api/v1/locations
//@access     Public
exports.getLocations = asyncHandler(async (req, res, next) => {
  const locations = await Location.find();
  res.status(200).json({
    success: true,
    count: locations.length,
    data: locations
  });
});

//@desc       Get single location
//@route      GET /api/v1/locations/:id
//@access     Public
exports.getLocation = asyncHandler(async (req, res, next) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    return next(new ErrorResponse(`Location not found with id of ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    data: location
  });
});

//@desc       Create location
//@route      POST /api/v1/locations
//@access     Private
exports.createLocation = asyncHandler(async (req, res, next) => {
  const location = await Location.create(req.body)
  res.status(201).json({
    success: true,
    data: location
  });
});

//@desc       Update location
//@route      PUT /api/v1/locations/:id
//@access     Private
exports.updateLocation = asyncHandler(async (req, res, next) => {
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!location) {
    return next(new ErrorResponse(`Location not found with id of ${req.params.id}`, 404));
  } res.status(200).json({
    success: true,
    data: location
  });
});

//@desc       Delete location
//@route      Delete /api/v1/locations/:id
//@access     Private
exports.deleteLocation = asyncHandler(async (req, res, next) => {
  const location = await Location.findByIdAndDelete(req.params.id);

  if (!location) {
    return next(new ErrorResponse(`Location not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});