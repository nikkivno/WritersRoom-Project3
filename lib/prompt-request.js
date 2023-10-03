require('dotenv').config({ path: '../.env' });

const openai = require('openai');
const openaiClient = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// function to request a prompt from api
async function requestPrompt(genre, type) {
  const request = `Create a writing prompt for a ${genre} ${type}.`;

  const response = await openaiClient.chat.completions.create({
    messages: [{ role: 'user', content: request }],
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
  });

  return response.choices[0].message.content;
}

module.exports = requestPrompt;
