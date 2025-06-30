const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
  keywords: [String], // mots clés cliquables
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Furniture', furnitureSchema);
