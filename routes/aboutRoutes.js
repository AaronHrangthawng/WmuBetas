import express from "express";
import About from "../models/About.js";

const router = express.Router();

// Default structure for new or missing fields
const defaultAboutData = {
  history: [],
  identity: [],
  nationalHistory: [],
  foundingFathers: [],
  mission: [],
  fraternityFacts: [],
  nationalHistoryImage: "",
  fraternityFactsImage: "",
  historyImage: "",
  identityImage: "",
  foundingFathersImage: "",
  missionImage: ""
};

// GET /api/about
router.get("/", async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      // Create if not found
      about = await About.create(defaultAboutData);
    } else {
      // Fill in any missing keys safely
      const updated = { ...defaultAboutData, ...about.toObject() };
      about = Object.assign(about, updated);
    }

    res.json(about);
  } catch (err) {
    console.error("❌ GET /api/about failed:", err);
    res.status(500).json({ error: "Failed to load About content" });
  }
});

// POST /api/about
router.post("/", async (req, res) => {
  try {
    const about = await About.create({ ...defaultAboutData, ...req.body });
    res.json(about);
  } catch (err) {
    console.error("❌ POST /api/about failed:", err);
    res.status(500).json({ error: "Failed to create About content" });
  }
});

// PUT /api/about
router.put("/", async (req, res) => {
  try {
    let current = await About.findOne();
    if (!current) {
      current = await About.create({ ...defaultAboutData, ...req.body });
    } else {
      Object.assign(current, { ...defaultAboutData, ...req.body });
      await current.save();
    }
    res.json(current);
  } catch (err) {
    console.error("❌ PUT /api/about failed:", err);
    res.status(500).json({ error: "Failed to update About content" });
  }
});

export default router;
