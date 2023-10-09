// Dependencies for MongoDB
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const promptRoutes = require('./promptRoutes');
const tokenRoutes = require('./tokenRoutes');

// Router for Users
router.use('/users', userRoutes);

// Router for Prompts
router.use('/prompts', promptRoutes);

// Router for Token Authentication
router.use('/validate', tokenRoutes);

// Module exports for router
module.exports = router;
