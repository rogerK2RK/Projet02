const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }]
});

module.exports = mongoose.model('Supplier', supplierSchema);
