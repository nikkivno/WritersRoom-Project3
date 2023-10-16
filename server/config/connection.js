// Dependency for MongoDB
const mongoose = require('mongoose');

// Connection for MongoDB with console logs for success or error
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/writers-room', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Module export for Mongoose
module.exports = mongoose;