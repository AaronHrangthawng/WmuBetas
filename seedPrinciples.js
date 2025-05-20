import mongoose from "mongoose";
import dotenv from "dotenv";
import Principle from "./models/Principle.js"; // ← singular, one doc = one principle

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/exotic-epsilon";

const seedData = [
  {
    title: "Brotherhood",
    description: "We create lifelong bonds of respect, trust, and support among our brothers.",
    image: "",
  },
  {
    title: "Scholarship",
    description: "We prioritize academic excellence and the pursuit of knowledge and growth.",
    image: "",
  },
  {
    title: "Service",
    description: "We are committed to community engagement and uplifting those around us.",
    image: "",
  },
  {
    title: "Cultural Awareness",
    description: "We honor our roots and promote cultural diversity, unity, and understanding.",
    image: "",
  },
];

async function seedPrinciples() {
  try {
    await mongoose.connect(MONGO_URI);
    await Principle.deleteMany({}); // delete all old individual docs
    const inserted = await Principle.insertMany(seedData);
    console.log(`✅ Seeded ${inserted.length} individual principle documents`);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedPrinciples();
