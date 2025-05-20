import express from "express";
import Eboard from "../models/Eboard.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const officers = await Eboard.find().sort({ sortOrder: 1 });
  res.json(officers);
});

router.post("/", async (req, res) => {
  const officer = await Eboard.create(req.body);
  res.status(201).json(officer);
});

router.put("/:id", async (req, res) => {
  const updated = await Eboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Eboard.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
