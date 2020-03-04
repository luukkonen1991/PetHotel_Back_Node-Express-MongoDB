const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Location = require('../models/Location');


//@desc       Get all locations
//@route      GET /api/v1/locations
//@access     Public
exports.getLocations = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  // Add user to req.body// req.user is the logged in user
  req.body.user = req.user.id;

  // Check for published location
  const publishedLocation = await Location.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one location
  if (publishedLocation && req.user.role !== 'admin') {
    return next(new ErrorResponse(`The user with ID ${req.user.id} has already published a location`, 400));
  }

  const location = await Location.create(req.body);
  res.status(201).json({
    success: true,
    data: location
  });
});

//@desc       Update location
//@route      PUT /api/v1/locations/:id
//@access     Private
exports.updateLocation = asyncHandler(async (req, res, next) => {
  let location = await Location.findById(req.params.id);

  if (!location) {
    return next(new ErrorResponse(`Location not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is location owner
  if (location.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this location`, 401));
  }

  location = await Location.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: location
  });
});

//@desc       Delete location
//@route      Delete /api/v1/locations/:id
//@access     Private
exports.deleteLocation = asyncHandler(async (req, res, next) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    return next(new ErrorResponse(`Location not found with id of ${req.params.id}`, 404));
  }

  location.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

//@desc       Upload photo for location
//@route      PUT /api/v1/locations/:id/photo
//@access     Private
exports.locationPhotoUpload = asyncHandler(async (req, res, next) => {
  const location = await Location.findById(req.params.id);

  if (!location) {
    return next(new ErrorResponse(`Location not found with id of ${req.params.id}`, 404));
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an imagine file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400));
  }

  // Create custom filename
  file.name = `photo_${location._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }
    await Location.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
