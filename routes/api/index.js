// Dependencies for MongoDB
const router = require('express').Router();
const userRoutes = require('./userRoutes');

// Router for Thoughts and Users
router.use('/users', userRoutes);

// Module exports for router
module.exports = router;