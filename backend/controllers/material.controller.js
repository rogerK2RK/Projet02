// material.controller.js
const Material = require('../models/Material');

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().populate('supplier');
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('supplier');
    if (!material) return res.status(404).json({ message: 'Not found' });
    res.json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMaterial = async (req, res) => {
  try {
    const { name, type, supplier, keywords } = req.body;
    const material = await Material.create({ name, type, supplier, keywords });
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMaterial = async (req, res) => {
  try {
    const updated = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const deleted = await Material.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Material deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
