import mongoose from 'mongoose';

const LineSchema = new mongoose.Schema({
  title: String,
  date: String,
  image: String,
  members: [String],
  me: String,
  ame: String,
  sortOrder: Number
});

const Line = mongoose.model('Line', LineSchema);
export default Line;
