const Furniture = require('../models/Furniture');

//  GET all furniture
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

//  GET one furniture by ID
exports.getFurnitureById = async (req, res) => {
  try {
    const furniture = await Furniture.findById(req.params.id)
      .populate('category')
      .populate('materials');
    if (!furniture) return res.status(404).json({ error: 'Not found' });
    res.json(furniture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  POST create new furniture
exports.createFurniture = async (req, res) => {
  try {
    const { name, category, materials, keywords } = req.body;
    const item = await Furniture.create({ name, category, materials, keywords });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  PUT update furniture
exports.updateFurniture = async (req, res) => {
  try {
    const updated = await Furniture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  DELETE furniture
exports.deleteFurniture = async (req, res) => {
  try {
    const deleted = await Furniture.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Furniture deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
