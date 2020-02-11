const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Location = require('../models/Location');


//@desc       Get all locations
//@route      GET /api/v1/locations
//@access     Public
exports.getLocations = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exlude 
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Make query to string in order to manipulate it
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Location.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {

    // default sort by date
    query = query.sort('-createdAt');
  }

  // Pagination (radix 10 = decimal)
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = (page) * limit;
  const total = await Location.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const locations = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit
    }
  }

  res.status(200).json({
    total: total,
    success: true,
    count: locations.length,
    pagination: pagination,
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

