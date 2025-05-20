import express from "express";
import HomeImage from "../models/HomeImage.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const images = await HomeImage.find().sort({ order: 1, uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { url, caption, order } = req.body;
    const image = new HomeImage({ url, caption, order });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await HomeImage.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
