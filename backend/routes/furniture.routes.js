const express = require('express');
const router = express.Router();
const { createFurniture, getAllFurniture, getFurnitureById } = require('../controllers/furniture.controller');

router.post('/', createFurniture);
router.get('/', getAllFurniture);
router.get('/:id', getFurnitureById);

module.exports = router;
