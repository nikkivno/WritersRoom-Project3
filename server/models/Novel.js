const { Schema, model } = require('mongoose');

// Schema to create Prompt model
const novelSchema = new Schema(
  {
    title: { type: String, required: false },
    text_input: { type: String, required: true },
    email: {
      type: String,
      required: true,
      ref: 'user',
    },
    prompt_id: {
      type: String,
      required: true,
      ref: 'prompt',
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
const Novel = model('novel', novelSchema);

module.exports = Novel;
