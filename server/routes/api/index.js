// Dependencies for MongoDB
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const promptRoutes = require('./promptRoutes');

// Router for Users
router.use('/users', userRoutes);

// Router for Prompts
router.use('/prompts', promptRoutes);

// Module exports for router
module.exports = router;
