const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Location = require('../models/Location');

//@desc       Get all reviews
//@route      GET /api/v1/reviews
//@route      GET /api/v1/locations/:locationId/reviews
//@access     Public
exports.getReviews = asyncHandler(async (req, res, next) => {
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

//@desc       Get singe review
//@route      GET /api/v1/reviews/:id
//@access     Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'location',
    select: 'name description'
  });

  if (!review) {
    return next(new ErrorResponse(`No review found with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

//@desc       Add singe review
//@route      POST /api/v1/locations/:locationId/review
//@access     Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.location = req.params.locationId;
  req.body.user = req.user.id;

  const location = await Location.findById(req.params.locationId);

  if (!location) {
    return next(new ErrorResponse(`No location with the id of ${req.params.locationId}`, 404));
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});