const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// // Anything below this statement will use protect middleware
// router.use(protect);
// // Anything below this statement will use authorize('admin') middleware
// router.use(authorize('admin'));

router.route('/')
  .get(protect, authorize('admin'), advancedResults(User), getUsers)
  .post(protect, createUser);

router.route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;