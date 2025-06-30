const Furniture = require('../models/Furniture');

exports.createFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.create(req.body);
    res.status(201).json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.find()
      .populate('category')
      .populate('materials');
    res.json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFurnitureById = async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id)
      .populate('category')
      .populate('materials');
    if (!furniture) return res.status(404).json({ message: 'Not found' });
    res.json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
