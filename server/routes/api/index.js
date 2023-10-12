// Dependencies for MongoDB
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const promptRoutes = require('./promptRoutes');
const tokenRoutes = require('./tokenRoutes');
const novelRoutes = require('./novelRoutes');

// Router for Users
router.use('/users', userRoutes);

// Router for Prompts
router.use('/prompts', promptRoutes);

// Router for Token Authentication
router.use('/validate', tokenRoutes);

// Router for Novels
router.use('/novels', novelRoutes);

// Module exports for router
module.exports = router;
