import express from "express";
import Firm from "../models/Firm.js";

const router = express.Router();

const defaultData = {
  firms: [],
};

router.get("/", async (req, res) => {
  try {
    let doc = await Firm.findOne();
    if (!doc) {
      doc = await Firm.create(defaultData);
    } else {
      const filled = { ...defaultData, ...doc.toObject() };
      doc = Object.assign(doc, filled);
    }
    res.json(doc);
  } catch (err) {
    console.error("GET /api/firm failed:", err);
    res.status(500).json({ message: "Failed to load Firm Family." });
  }
});

router.put("/", async (req, res) => {
  try {
    let doc = await Firm.findOne();
    if (!doc) {
      doc = await Firm.create({ ...defaultData, ...req.body });
    } else {
      doc.firms = req.body.firms || [];
      await doc.save();
    }
    res.json(doc);
  } catch (err) {
    console.error("PUT /api/firm failed:", err);
    res.status(500).json({ message: "Failed to update Firm Family." });
  }
});

export default router;
