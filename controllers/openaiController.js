const requestPrompt = require('../lib/prompt-request');

// request a new prompt from OpenAI
async function newPrompt(req, res) {
  try {
    const prompt = await requestPrompt(req.body.genre, req.body.type);

    res.json(prompt);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = { newPrompt };
