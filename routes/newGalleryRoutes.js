import express from "express";
import NewGalleryImage from "../models/NewGalleryImage.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const images = await NewGalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Failed to load gallery." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { url, title } = req.body;
    if (!url || !title) return res.status(400).json({ message: "Missing url or title" });

    const image = await NewGalleryImage.create({ url, title });
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: "Failed to upload image." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await NewGalleryImage.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: "Failed to delete image." });
  }
});

export default router;
