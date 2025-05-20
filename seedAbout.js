// seedAbout.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import About from "./models/About.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const defaultAboutData = {
  history: [
    "1987: Vega & Balderramas attend the Midwest Hispanic Leadership Conference and connect with Sigma Lambda Beta in Chicago.",
    "Nov 13, 1987: Attend a pivotal event at University of Iowa — inspire chapter creation.",
    "Feb 27, 1988: Vega, Balderramas, and Camarillo initiated into pledge line “L.E.”",
    "Apr 3, 1988: Official founding of Sigma Lambda Beta at WMU.",
    "1999–2000: Chapter revival with line L.S.D.N. — chartered at USHLI Conference.",
    "2000–Present: Recognized for excellence by WMU and SLB on national and regional levels."
  ],
  identity: [
    "Colors: Royal Purple & The Purest White",
    "Mascot: White Stallion Mustang — representing power and freedom",
    "Chapter Nickname: Exotic Epsilon",
    "Publications: El Iluminador & REGO Magazine",
    "Focus: Academic excellence, cultural awareness, community leadership",
    "Programs: USHLI's CLDP, I.M.P.A.C.T., NIC’s FuturesQuest",
    "Recognition: Multiple campus and national awards"
  ],
  nationalHistory: [
    "Founded on April 4, 1986 at the University of Iowa by Brother Baltazar Mendoza-Madrigal and 17 others, Sigma Lambda Beta was built on four core values: Brotherhood, Scholarship, Cultural Awareness, and Community Service.",
    "Now with over 90 undergraduate chapters and 15 alumni associations internationally, SLB advocates for underrepresented communities and promotes cultural empowerment through leadership and service.",
    "Our legacy is carried forward by alumni excelling in academics, professions, and community engagement around the world."
  ],
  foundingFathers: [
    "Baltazar Mendoza-Madrigal", "Mario Buendia", "Enrique Carbajal", "Thomas Carrasquillo",
    "Manuel Chavarria", "Jose Fong", "Rudolfo Garza", "Luis Jimenez",
    "Luis Marquez", "Eric Montes", "Kuy Ou", "Olakunle Oyeyemi",
    "Jaime Ramirez", "Olivero Rivera", "Juan Jose Rojas Cardona", "Eugenio Soria",
    "Juan Valdez", "Ricardo Zamudio"
  ],
  mission: [
    "To create and expand multicultural leadership.",
    "To cultivate honorable friendships.",
    "To advance male success in college and beyond.",
    "To promote culture in a positive manner.",
    "To exhibit standards of excellence in morality, ethics, and education.",
    "To disseminate diverse culture across communities.",
    "To nurture fairness, opportunity, and equality.",
    "To progress society through cultural understanding."
  ],
  fraternityFacts: [
    "Official founding date: April 4, 1986",
    "Colors: Royal Purple & Purest White",
    "Motto: Opportunity for Wisdom, Wisdom for Culture",
    "Fraternity flower: Red Carnation",
    "Shield represents unity, history, and values"
  ],
  nationalHistoryImage: "",
  fraternityFactsImage: "",
  historyImage: "",
  identityImage: "",
  foundingFathersImage: "",
  missionImage: ""
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await About.findOne();
    if (existing) {
      console.log("ℹ️ About document already exists. Updating it...");
      Object.assign(existing, defaultAboutData);
      await existing.save();
    } else {
      console.log("➕ Creating new About document...");
      await About.create(defaultAboutData);
    }

    console.log("✅ About document seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
