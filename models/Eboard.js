import mongoose from "mongoose";

const eboardSchema = new mongoose.Schema({
  position: String,
  name: String,
  bio: String,
  image: String,
  sortOrder: Number,
});

export default mongoose.models.Eboard || mongoose.model("Eboard", eboardSchema);
