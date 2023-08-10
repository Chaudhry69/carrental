const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const mongoose = require('mongoose');

// Import the User schema
const User = require('../Model/user'); // Make sure to adjust the path to the User schema

const app = express();
mongoose.Promise = global.Promise;

const mongoDatabase = 'mongodb+srv://chaudhryfaiq69:user@cluster0.q9bo7ex.mongodb.net/test'; // Replace with your MongoDB connection string

mongoose.connect(mongoDatabase, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database is connected');
  })
  .catch(err => {
    console.log('There is a problem while connecting to the database: ' + err);
  });

const port = process.env.PORT || 4000;

// Use the cors middleware
app.use(cors());

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Import and use the recordRoute router
const recordRoute = require('../Routes/records.routes'); // Adjust the path accordingly
app.use('/api', recordRoute); // Assuming you want to prefix all your routes with '/api'

// Start the server
app.listen(port, function () {
  console.log('Server is listening on port: ' + port);
});
