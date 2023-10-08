// Dependencies for MongoDB
const mongoose = require('mongoose');
const { User, Prompt } = require('../models');

// Connect to the database
mongoose
  .connect('mongodb://127.0.0.1:27017/writers-room', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Seed data for database (Users & Prompts)
const seedData = {
  users: [
    {
      first_name: 'jared',
      last_name: 'stratton',
      email: 'jared@seeds.com',
      password: 'test',
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
  prompts: [
    {
      prompt: 'Test writing prompt.',
      email: 'sarah@seeds.com',
    },
  ],
};

// Function for seeding the database
async function seedDatabase() {
  try {
    const createdUsers = await User.insertMany(seedData.users);
    const createdPrompts = await Prompt.insertMany(seedData.prompts);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();
