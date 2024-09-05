const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
});

app.listen(PORT, () => {
console.log(`API server running on port ${PORT}!`);
});
