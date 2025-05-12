const mongoose = require('mongoose');
require('dotenv').config();
const EBoard = require('./models/Eboard');

const members = [
  { name: "Adrian Flores", position: "President", image: "Adrian.jpg" },
  { name: "Issac Lussier", position: "Vice-President", image: "Issac.jpg" },
  { name: "Jose Silva", position: "Finance", image: "Silva.jpg" },
  { name: "Aaron Lopez Robles", position: "Communications", image: "Aaron.jpg" },
  { name: "Andy Sustaita", position: "Step & Stroll Coordinator", image: "Andy.jpg" },
  { name: "Juan-Luis Gutierrez", position: "Programming Chair", image: "Jlouie.jpg" },
  { name: "Jose Perez", position: "Programming Chair", image: "Perex.jpg" },
  { name: "Aaron Hrangthawng", position: "WSA Delegate", image: "Thiansang.jpg" },
  { name: "Juan Moreno", position: "MGC Delegate", image: "JD.jpg" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await EBoard.deleteMany({});
    await EBoard.insertMany(members);
    console.log("✅ E-Board collection seeded.");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seed();
