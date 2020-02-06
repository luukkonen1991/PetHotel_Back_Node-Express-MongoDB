const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// connect to database

// Route files

const app = express();

// Set static folser
app.use(express.static(path.join(__dirname, 'public')));



const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json('Hello World!');
});

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`.yellow.bold);
});

