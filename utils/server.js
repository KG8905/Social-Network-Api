const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');  // Ensure these files exist
const thoughtRoutes = require('./routes/thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Route handlers
app.use('/api/users', userRoutes);    // Users route, mounted at /api/users
app.use('/api/thoughts', thoughtRoutes);  // Thoughts route, mounted at /api/thoughts

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Verify DB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
