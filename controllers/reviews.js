const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Location = require('../models/Location');

//@desc       Get all reviews
//@route      GET /api/v1/reviews
//@route      GET /api/v1/locations/:locationId/reviews
//@route      GET /api/v1/users/:userId/reviews
//@access     Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.locationId) {
    const reviews = await Review.find({ location: req.params.locationId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  }

  if (req.params.userId) {
    const reviews = await Review.find({ user: req.params.userId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  }

  else {
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
//@route      POST /api/v1/locations/:locationId/reviews
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

//@desc       Update singe review
//@route      PUT /api/v1/reviews/:id
//@access     Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: review
  });
});

//@desc       Delete single review
//@route      DELETE /api/v1/reviews/:id
//@access     Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404));
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update review`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});