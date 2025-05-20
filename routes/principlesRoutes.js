// routes/principlesRoutes.js
import express from "express";
import Principle from "../models/Principle.js";

const router = express.Router();

// GET /api/principles → Get all principles
router.get("/", async (req, res) => {
  try {
    const principles = await Principle.find().sort({ _id: 1 });
    res.json(principles);
  } catch (err) {
    console.error("❌ GET /api/principles failed:", err);
    res.status(500).json({ message: "Failed to fetch principles." });
  }
});

// PUT /api/principles → Replace all principles
router.put("/", async (req, res) => {
  try {
    const incoming = req.body;

    if (!Array.isArray(incoming)) {
      return res.status(400).json({ message: "Expected an array of principles." });
    }

    console.log("📥 Replacing with:", incoming);

    await Principle.deleteMany({});
    const saved = await Principle.insertMany(incoming);
    res.json(saved);
  } catch (err) {
    console.error("❌ PUT /api/principles failed:", err);
    res.status(500).json({ message: "Failed to update principles.", error: err.message });
  }
});

export default router;
