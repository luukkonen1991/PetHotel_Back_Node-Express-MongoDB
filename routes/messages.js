const express = require('express');
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage
} = require('../controllers/messages');

const Message = require('../models/Message');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin'), advancedResults(Message), getMessages)
  .post(createMessage);

router.route('/:id')
  .get(protect, authorize('admin'), getMessage)
  .put(protect, authorize('admin'), updateMessage)
  .delete(protect, authorize('admin'), deleteMessage);


module.exports = router;