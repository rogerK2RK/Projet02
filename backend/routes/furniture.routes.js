const express = require('express');
const router = express.Router();
const {
  getAllFurniture,
  getFurnitureById,
  createFurniture,
  updateFurniture,
  deleteFurniture
} = require('../controllers/furniture.controller');

router.get('/', getAllFurniture);
router.get('/:id', getFurnitureById);
router.post('/', createFurniture);
router.put('/:id', updateFurniture);
router.delete('/:id', deleteFurniture);

module.exports = router;
