const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Load models
const Location = require('./models/Location');
const User = require('./models/User');
const Message = require('./models/Message');
const Review = require('./models/Review');


// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const locations = JSON.parse(fs.readFileSync(`${__dirname}/_data/locations.json`, 'utf-8'));

const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

const messages = JSON.parse(fs.readFileSync(`${__dirname}/_data/messages.json`, 'utf-8'));

const reviews = JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await Location.create(locations);
    await User.create(users);
    await Message.create(messages);
    await Review.create(reviews);
    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data in db
const deleteData = async () => {
  try {
    await Location.deleteMany();
    await User.deleteMany();
    await Message.deleteMany();
    await Review.deleteMany();
    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}