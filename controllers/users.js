const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//@desc       Get all users
//@route      GET /api/v1/users
//@access     Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc       Get single user
//@route      GET /api/v1/users/:id
//@access     Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc       Create user
//@route      Post /api/v1/users
//@access     Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

//@desc       Update user
//@route      Put /api/v1/users/:id
//@access     Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// //@desc       Delete user
// //@route      DELETE /api/v1/users/:id
// //@access     Private/Admin
// exports.deleteUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     success: true,
//     data: {}
//   });
// });

//@desc       Delete user
//@route      DELETE /api/v1/users/:id
//@access     Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

  if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this user`, 401));
  }

  user.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});