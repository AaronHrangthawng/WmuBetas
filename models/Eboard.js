const mongoose = require('mongoose');

const eboardSchema = new mongoose.Schema({
  name: String,
  position: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('EBoard', eboardSchema);
