const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb://localhost:3001/userThoughtDB', {
  // useFindAndModify: false,  
useNewUrlParser: true,
useUnifiedTopology: true,
})

// Export connection 
module.exports = mongoose.connection;