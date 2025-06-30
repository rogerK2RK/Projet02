// material.controller.js
const Material = require('../models/Material');

exports.getMaterials = async (req, res) => {
  const materials = await Material.find().populate('supplier');
  res.json(materials);
};

exports.createMaterial = async (req, res) => {
  try {
    const material = await Material.create(req.body);
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
