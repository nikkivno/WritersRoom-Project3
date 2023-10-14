const { Schema, model } = require('mongoose');

// Define a schema for prompts
const promptSchema = new Schema(
  {
    // Define fields for prompts here
    characters: String,
    reason: String,
    // Add other fields as needed
  },
  {
    _id: false, // To prevent generating separate _id for prompts
  }
);

// Schema to create Novel model
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'prompt',
    },
    prompts: [promptSchema], // Array to store prompts within a novel
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