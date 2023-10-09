// Dependencies for MongoDB
const router = require('express').Router();
const apiRoutes = require('./api');

// Router for apiRoutes
router.use('/api', apiRoutes);

// Module exports for router
module.exports = router;
