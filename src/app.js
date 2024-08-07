const express = require('express'); // Import the Express library
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const presentationsRoutes = require('./routes/presentationsRouter'); // Import the presentations routes

const app = express(); // Create an Express application

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle routes related to presentations
app.use('/presentations', presentationsRoutes);

// Export the Express application
module.exports = app;
