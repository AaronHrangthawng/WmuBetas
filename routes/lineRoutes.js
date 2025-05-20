import express from "express";
import Line from "../models/Line.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const lines = await Line.find().sort({ date: -1 });
  res.json(lines);
});

router.post("/", async (req, res) => {
  const { title, date, image, members, me, ame } = req.body;
  const line = new Line({ title, date, image, members, me, ame });
  await line.save();
  res.status(201).json(line);
});

router.delete("/:id", async (req, res) => {
  await Line.findByIdAndDelete(req.params.id);
  res.json({ message: "Line deleted" });
});

router.put("/:id", async (req, res) => {
  const { title, date, image, members, me, ame } = req.body;

  const update = {
    title,
    date,
    members,
    me,
    ame,
  };

  // Only update image if one is provided
  if (image) {
    update.image = image;
  }

  const updated = await Line.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  res.json(updated);
});


export default router;
