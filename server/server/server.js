// Imported required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// MongoDB Database URL
const mongoDatabase = 'mongodb+srv://chaudhryfaiq69:user@cluster0.q9bo7ex.mongodb.net/test'; // Replace "your-database-name" with your actual database name

// Create express server
const app = express();
mongoose.Promise = global.Promise;

// Connect MongoDB Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true })
  .then(() => {
    console.log('Database is connected');
  })
  .catch(err => {
    console.log('There is a problem while connecting to the database: ' + err);
  });

// Import routes
const recordRoutes = require('../Routes/records.routes');

// Convert incoming data to JSON format
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Routes Configuration
app.use('/api/records', recordRoutes);

// Set up server port
const port = process.env.PORT || 4000;

// Start the server
app.listen(port, function () {
  console.log('Server is listening on port: ' + port);
});
