const express = require('express');
const router = express.Router();
const promptController = require('../../controllers/promptController');

// GET all prompts
router.get('/', promptController.getAllPrompts);

// GET a prompt by id
router.get('/:id', promptController.getPromptById);

// POST to request a prompt
router.post('/openai', promptController.newPrompt);

// POST a new prompt to the database
router.post('/', promptController.addPrompt);

// PUT to update a prompt?
router.put('/:id', promptController.updatePrompt);

// DELETE a prompt
router.delete('/:id', promptController.deletePrompt);

module.exports = router;
