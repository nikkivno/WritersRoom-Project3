// Dependencies for MongoDB
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).json({ message: 'All input is required' });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      console.log('User already exists');
      return res
        .status(409)
        .json({ message: 'User Already Exists. Please Login' });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: '2h',
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
// Our register logic ends here

async function login(req, res) {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      console.log('Missing input');
      return res.status(400).json({ message: 'All input is required' });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    res.status(400).json({ message: 'Invalid Credentials' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // Our register logic ends here
}

module.exports = {
  // GET all Users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error getting users', error: error.message });
    }
  },
  // GET user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('story');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error getting user', error: error.message });
    }
  },
  // Create User
  createUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Error creating user', error: error.message });
    }
  },
  // Update User
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Error updating user', error: error.message });
    }
  },
  // Delete User
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Delete the user using deleteOne
      await User.deleteOne({ _id: userId });

      res.status(200).json({ message: 'User and associated thoughts deleted' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error deleting user', error: error.message });
    }
  },

  register,
  login,
};
