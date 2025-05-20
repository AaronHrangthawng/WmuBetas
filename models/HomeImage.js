import mongoose from "mongoose";

const homeImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String },
  order: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("HomeImage", homeImageSchema);
