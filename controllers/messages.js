const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Message = require('../models/Message');

//@desc       Get all messages
//@route      GET /api/v1/messages
//@access     Private/Admin
exports.getMessages = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc       Get single message
//@route      GET /api/v1/messages/:id
//@access     Private/Admin
exports.getMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: message
  });
});

//@desc       Create message
//@route      Post /api/v1/messages
//@access     Public
exports.createMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.create(req.body);

  res.status(201).json({
    success: true,
    data: message
  });
});

//@desc       Update message
//@route      Put /api/v1/messages/:id
//@access     Private/Admin
exports.updateMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: message
  });
});

//@desc       Delete message
//@route      DELETE /api/v1/messages/:id
//@access     Private/Admin
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});