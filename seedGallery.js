import mongoose from "mongoose";
import dotenv from "dotenv";
import GalleryImage from "./models/NewGalleryImage.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/exotic-epsilon";

async function seedGallery() {
  try {
    await mongoose.connect(MONGO_URI);
    await GalleryImage.deleteMany({});
    console.log("✅ Gallery collection cleared. Ready for fresh uploads.");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedGallery();
