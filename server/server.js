// Dependencies for server
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const path = require('path');

// Middleware setup
app.use(express.json());

// Connect to the database using the connection string
mongoose
  .connect('mongodb://127.0.0.1:27017/writers-room', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Once connected, set up your routes
    app.use('/', routes);

    app.use(express.static(path.join(__dirname, '../client/build')));
    require('./routes/htmlRoutes')(app);

    // Start the Express server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
