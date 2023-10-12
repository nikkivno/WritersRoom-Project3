const mongoose = require('mongoose');
const Novel = require('../models/Novel');

// add a novel to the database
async function addNovel(req, res) {
  try {
    const newNovel = new Novel(req.body);

    await newNovel.save();
    res.status(200).json(newNovel);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error adding novel: ', error);
  }
}

// get all novels
async function getAllNovels(req, res) {
  try {
    const novels = await Novel.find();

    res.status(200).json(novels);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error getting all novels: ', error);
  }
}

// get a novel by id
async function getNovelById(req, res) {
  try {
    const novel = await Novel.findById(req.params.id);

    if (!novel) {
      return res
        .status(404)
        .json({ message: `No novel found with id: ${req.params.id}` });
    }

    res.status(200).json(novel);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error finding novel: ', error);
  }
}

// update a novel
async function updateNovel(req, res) {
  try {
    const updatedNovel = await Novel.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedNovel) {
      return res
        .status(404)
        .json({ message: `No novel found with id: ${req.params.id}` });
    }

    res.status(200).json(updatedNovel);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error updating novel: ', error);
  }
}

// delete a novel
async function deleteNovel(req, res) {
  try {
    const novel = await Novel.findById(req.params.id);

    if (!novel) {
      return res.status(404).json(`No novel found with id: ${req.params.id}`);
    }

    await Novel.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: `Novel with id ${req.params.id} successfully deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('Error deleting novel: ', error);
  }
}

module.exports = {
  addNovel,
  getAllNovels,
  getNovelById,
  updateNovel,
  deleteNovel,
};
