const path = require('path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

// Route files
const locations = require('./routes/locations');
const auth = require('./routes/auth');
const users = require('./routes/users');
const messages = require('./routes/messages');
const reviews = require('./routes/reviews');

const app = express();

//Body parser
app.use(express.json());

// Cookier parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/locations', locations);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/messages', messages);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} on mode ${process.env.NODE_ENV}`.yellow.bold);
});

// Handle unhandeled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
