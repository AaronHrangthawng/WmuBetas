import mongoose from "mongoose";

const newGalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },       // Cloudinary image URL
  title: { type: String, required: true },     // Caption or title
}, { timestamps: true });

export default mongoose.models.NewGalleryImage || mongoose.model("NewGalleryImage", newGalleryImageSchema);
