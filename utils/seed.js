// Dependencies for MongoDB
const mongoose = require('mongoose');
const { User } = require('../models');

// Connect to the database
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

// Seed data for database (Users)
const seedData = {
  users: [
    {
      username: 'jared.stratton',
      email: 'jared@seeds.com',
      friends: [],
    },
    {
      username: 'sarah.stone',
      email: 'sarah@seeds.com',
      friends: [],
    },
    {
      username: 'scott.ogrins',
      email: 'scott@seeds.com',
      friends: [],
    },
    {
      username: 'nikki.vigneault',
      email: 'nikki@seeds.com',
      friends: [],
    },
  ],
};

// Function for seeding the database
async function seedDatabase() {
  try {
    const createdUsers = await User.insertMany(seedData.users);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();