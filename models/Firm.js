import mongoose from "mongoose";

const firmItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
});

const firmSchema = new mongoose.Schema({
  firms: [firmItemSchema],
});

export default mongoose.models.Firm || mongoose.model("Firm", firmSchema);
