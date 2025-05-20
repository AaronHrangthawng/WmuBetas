import express from "express";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import HomeImage from "../models/HomeImage.js";

const router = express.Router();

// Multer config: store file temporarily in "uploads" folder
const upload = multer({ dest: "uploads/" });

// GET all hero images
router.get("/images", async (req, res) => {
  try {
    const images = await HomeImage.find().sort("order");
    res.json(images);
  } catch (err) {
    console.error("❌ GET error:", err);
    res.status(500).json({ error: "Failed to load images" });
  }
});

// POST upload new image to Cloudinary and store in MongoDB
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "exotic-epsilon", // optional Cloudinary folder
    });

    // Delete local file after upload
    fs.unlink(filePath, (err) => {
      if (err) console.warn("⚠️ Failed to delete temp file:", err);
    });

    // Create image entry in MongoDB
    const newImage = await HomeImage.create({
      url: result.secure_url,
      caption: req.body.caption || "",
      order: 0,
    });

    res.json(newImage);
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Image upload failed" });
  }
});

// PUT update image order and/or caption
router.put("/images/order", async (req, res) => {
  try {
    const updates = req.body.images;
    const ops = updates.map((img) =>
      HomeImage.findByIdAndUpdate(img._id, {
        order: img.order,
        caption: img.caption || "",
      })
    );
    await Promise.all(ops);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: "Failed to update images" });
  }
});

// DELETE an image
router.delete("/images/:id", async (req, res) => {
  try {
    await HomeImage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

export default router;
