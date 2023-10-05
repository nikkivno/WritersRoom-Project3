const { Schema, model } = require('mongoose');

// Schema to create Prompt model
const promptSchema = new Schema(
  {
    prompt: { type: String, require: true, maxLength: 500 },
    email: {
      type: String,
      required: true,
      ref: 'user',
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Create model
const Prompt = model('prompt', promptSchema);

module.exports = Prompt;
