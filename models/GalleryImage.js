const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  file: String,
  caption: String
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
