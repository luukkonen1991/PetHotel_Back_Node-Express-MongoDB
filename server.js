const path = require('path')
const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');

const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/config.env' });

// connect to database
connectDB();

// Route files
const locations = require('./routes/locations');


const app = express();

//Body parser
app.use(express.json());

// Cookier parser

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/locations', locations);

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} on mode ${process.env.NODE_ENV}`.yellow.bold);
});

// Handle unhandeled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1))
})
