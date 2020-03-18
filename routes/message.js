const express = require('express');
const {
  getMessages
} = require('../controllers/messages');

const Message = require('../models/Message');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(advancedResults(protect, authorize('admin'), Message), getMessages);