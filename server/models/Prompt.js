const { Schema, model } = require('mongoose');

// Schema to create Prompt model
const promptSchema = new Schema(
  {
    prompt: { type: String, required: true },
    catalyst_input: { type: String, required: false },
    midpoint_input: { type: String, required: false },
    ending_input: { type: String, required: false },
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
