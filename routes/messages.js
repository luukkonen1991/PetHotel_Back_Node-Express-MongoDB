const express = require('express');
const {
  getMessages
} = require('../controllers/messages');

const Message = require('../models/Message');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin'), advancedResults(Message), getMessages);

module.exports = router;