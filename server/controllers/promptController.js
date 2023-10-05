const requestPrompt = require('../lib/prompt-request');
const mongoose = require('mongoose');
const Prompt = require('../models/Prompt');

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

// add a prompt to the database
async function addPrompt(req, res) {
  try {
    const newPrompt = new Prompt(req.body);
    await newPrompt.save();
    res.status(200).json(newPrompt);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error adding prompt: ', error);
  }
}

// get all prompts
async function getAllPrompts(req, res) {
  try {
    const prompts = await Prompt.find();
    res.status(200).json(prompts);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error getting all prompts: ', error);
  }
}

// get a prompt by id
async function getPromptById(req, res) {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res
        .status(404)
        .json({ message: `No prompt found with id: ${res.params.id}` });
    }
    res.status(200).json(prompt);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error finding prompt: ', error);
  }
}

// update a prompt
async function updatePrompt(req, res) {
  try {
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    if (!updatedPrompt) {
      return res
        .status(404)
        .json({ message: `No prompt found with id: ${req.params.id}` });
    }
    res.status(200).json(updatePrompt);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error updating prompt: ', error);
  }
}

// delete a prompt
async function deletePrompt(req, res) {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json(`No prompt found with id: ${req.params.id}`);
    }

    await Prompt.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: `Prompt with id ${req.params.id} successfully deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('Error deleting prompt: ', error);
  }
}

module.exports = {
  newPrompt,
  addPrompt,
  getAllPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
};
