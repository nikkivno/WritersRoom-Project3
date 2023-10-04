// Dependencies for MongoDB
const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:userId', userController.getUserById);

// POST to create new user
router.post('/register', userController.register);

router.post('/login', userController.login)
// PUT to update user by ID
router.put('/:userId', userController.updateUser);

// DELETE a user by ID
router.delete('/:userId', userController.deleteUser);

// Module export for router
module.exports = router;