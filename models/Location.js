const mongoose = require('mongoose');
const slugify = require('slugify');

const LocationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
  costType: {
    type: String,
    required: [true, 'Please add cost type by hours or days'],
    enum: [
      'Hour',
      'Day'
    ]
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'Please add phone number'],
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  costAmount: {
    type: Number,
    required: [true, 'Please add the cost amount']
  },
  location: {
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  animalTypes: {
    type: [String],
    required: [true, 'Please add animal types'],
    enum: [
      'Dogs',
      'Cats',
      'Others'
    ]
  },
  services: {
    type: [String],
    required: [true, 'Please add services you provide'],
    enum: [
      'Food',
      'Toys',
      'Walking'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating can not be more than 5']
  },
  photo: {
    //the file name is string
    type: String,
    default: 'no-photo.png'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

LocationSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});


module.exports = mongoose.model('Location', LocationSchema);