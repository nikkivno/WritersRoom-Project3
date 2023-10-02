// Dependency for MongoDB
const mongoose = require('mongoose');

// Connection for MongoDB with console logs for success or error
mongoose.connect('mongodb://127.0.0.1:27017/writers-room', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Module export for Mongoose
module.exports = mongoose;