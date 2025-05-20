import mongoose from "mongoose";
import dotenv from "dotenv";
import Eboard from "../models/Eboard.js"; // Adjust path if needed

dotenv.config();

async function updateSortOrder() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const officers = await Eboard.find().sort({ createdAt: 1 }); // or any preferred default order

    const updates = officers.map((officer, index) => {
      officer.sortOrder = index;
      return officer.save();
    });

    await Promise.all(updates);
    console.log("✅ All Eboard documents updated with sortOrder");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error updating sortOrder:", err);
    process.exit(1);
  }
}

updateSortOrder();
