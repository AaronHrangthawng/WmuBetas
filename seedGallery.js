const mongoose = require('mongoose');
require('dotenv').config();
const GalleryImage = require('./models/GalleryImage');

const images = [
  { file: "pics1.JPG", caption: "S.S.L.C.S.Y.O" },
  { file: "pics2.webp", caption: "E.E.C.C.U.S" },
  { file: "pics3.jpg", caption: "D.A.L.E" },
  { file: "pics4.jpg", caption: "Gammas" },
  { file: "pics5.jpg", caption: "Retro" },
  { file: "pics6.jpg", caption: "Culture Shock Stroll Competition" },
  { file: "pics7.jpg", caption: "K.I.N.G.S" },
  { file: "pics8.jpg", caption: "Founders" },
  { file: "pics9.jpg", caption: "Function" },
  { file: "pics10.jpg", caption: "Purple Fam" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await GalleryImage.deleteMany({});
    await GalleryImage.insertMany(images);
    console.log("✅ Gallery collection seeded.");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seed();
