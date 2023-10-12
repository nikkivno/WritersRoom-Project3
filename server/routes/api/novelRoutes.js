const express = require('express');
const router = express.Router();
const novelController = require('../../controllers/novelController');

// GET all novels
router.get('/', novelController.getAllNovels);

// GET a novel by id
router.get('/:id', novelController.getNovelById);

// POST a new novel to the database
router.post('/', novelController.addNovel);

// PUT to update a novel
router.put('/:id', novelController.updateNovel);

// DELETE a novel
router.delete('/:id', novelController.deleteNovel);

module.exports = router;
