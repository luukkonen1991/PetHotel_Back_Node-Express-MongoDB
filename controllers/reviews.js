const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Location = require('../models/Location');

//@desc       Get all reviews
//@route      GET /api/v1/reviews
//@route      GET /api/v1/locations/:locationId/reviews
//@access     Public
exports.getLocations = asyncHandler(async (req, res, next) => {
  if (req.params.locationId) {
    const reviews = await Review.find({ location: req.params.locationId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});