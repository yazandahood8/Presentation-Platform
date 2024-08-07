const express = require('express'); // Import the Express library
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions
const app = express(); // Create an Express application

// Middleware to parse JSON request bodies
app.use(express.json());

// Import and use routes
const presentationsRoutes = require('./routes/presentationsRouter'); // Import routes for presentations
app.use('/api', presentationsRoutes); // Mount the presentations routes under '/api'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/presentation-platform', {
    useNewUrlParser: true, // Use the new URL string parser
    useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
}).then(() => {
    console.log('MongoDB connected'); // Log successful connection
}).catch(err => {
    console.error('MongoDB connection error:', err); // Log connection errors
});

// Start the server
const PORT = process.env.PORT || 3000; // Use the port from environment variable or default to 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Log server start message
});
