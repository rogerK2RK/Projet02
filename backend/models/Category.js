const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, enum: ['Armoire', 'Etagère'], required: true }
});

module.exports = mongoose.model('Category', categorySchema);
