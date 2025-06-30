// material.routes.js
const express = require('express');
const router = express.Router();
const { getMaterials, createMaterial } = require('../controllers/material.controller');

router.get('/', getMaterials);
router.post('/', createMaterial);

module.exports = router;
