const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  title: String,
  date: String,
  image: String,
  members: [String],
  me: String,
  ame: String
}, { timestamps: true });

module.exports = mongoose.model('Line', lineSchema);
