const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 10']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  location: {
    type: mongoose.Schema.ObjectId,
    ref: 'Location',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent user from submittin more than one review per location
ReviewSchema.index({ location: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (locationId) {
  const obj = await this.aggregate([
    {
      $match: { location: locationId }
    },
    {
      $group: {
        _id: '$location',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Location').findByIdAndUpdate(locationId, {
      averageRating: obj[0].averageRating
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getAverageRating after save
ReviewSchema.post('save', async function () {
  await this.constructor.getAverageRating(this.location);
});

// Call getAverageRating before remove
ReviewSchema.pre('remove', async function () {
  await this.constructor.getAverageRating(this.location);
});

module.exports = mongoose.model('Review', ReviewSchema);