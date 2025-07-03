// material.routes.js
const express = require('express');
const router = express.Router();
const { getFurnitureByMaterial } = require('../controllers/material.controller');


const {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} = require('../controllers/material.controller');

router.get('/', getAllMaterials);
router.get('/:id', getMaterialById);
router.post('/', createMaterial);
router.put('/:id', updateMaterial);
router.delete('/:id', deleteMaterial);
router.get('/:id/furniture', getFurnitureByMaterial);


module.exports = router;

