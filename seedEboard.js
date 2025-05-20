import mongoose from "mongoose";
import dotenv from "dotenv";
import Eboard from "./models/Eboard.js"; // make sure this path is correct

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/exotic-epsilon";

const seedData = [
  {
    position: "President",
    name: "Adrian Flores",
    bio: "Oversees chapter operations and external communication.",
    image: "https://res.cloudinary.com/dqex0du42/image/upload/v1717122461/eboardUp1.jpg",
    sortOrder: 0,
  },
  {
    position: "Vice President",
    name: "Issac Lussier",
    bio: "Assists the president and coordinates internal affairs.",
    image: "https://res.cloudinary.com/dqex0du42/image/upload/v1717122507/eboardUp2.jpg",
    sortOrder: 1,
  },
  {
    position: "Finance",
    name: "Jose Silva",
    bio: "Handles the chapter’s budget and financial records.",
    image: "",
    sortOrder: 2,
  },
  {
    position: "Communications",
    name: "Aaron Lopez Robles",
    bio: "Manages public relations, emails, and announcements.",
    image: "",
    sortOrder: 3,
  },
  {
    position: "Step & Stroll Coordinator",
    name: "Andy Sustaita",
    bio: "Leads choreography and coordination for performances.",
    image: "",
    sortOrder: 4,
  },
  {
    position: "Programming Chair",
    name: "Juan-Luis Gutierrez",
    bio: "Plans and organizes events for the chapter.",
    image: "",
    sortOrder: 5,
  },
  {
    position: "Programming Chair",
    name: "Jose Perez",
    bio: "Works on event planning and internal programming.",
    image: "",
    sortOrder: 6,
  },
  {
    position: "WSA Delegate",
    name: "Aaron Hrangthawng",
    bio: "Represents the chapter in the WSA body.",
    image: "",
    sortOrder: 7,
  },
  {
    position: "MGC Delegate",
    name: "Juan Moreno",
    bio: "Represents the chapter within the MGC council.",
    image: "",
    sortOrder: 8,
  },
];

async function seedEboard() {
  try {
    await mongoose.connect(MONGO_URI);
    await Eboard.deleteMany({});
    const inserted = await Eboard.insertMany(seedData);
    console.log(`✅ Seeded ${inserted.length} officers`);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedEboard();
