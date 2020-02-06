const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

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

// Set static folser
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/locations', locations);


const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json('Hello World!');
});

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`.yellow.bold);
});

