const mongoose = require('mongoose');
const chrono = require('chrono-node');
const Line = require('./models/Line');
require('dotenv').config();

async function updateSortDates() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const lines = await Line.find();

  for (const line of lines) {
    const rawDate = line.date;

    const parsed = chrono.parseDate(rawDate);

    if (!parsed) {
      console.warn(`❌ Could not parse date from: "${rawDate}"`);
      continue;
    }

    line.sortDate = parsed;
    await line.save();

    console.log(`✅ ${line.title} → ${parsed.toISOString().split('T')[0]}`);
  }

  await mongoose.disconnect();
  console.log('✅ Done updating sortDate fields.');
}

updateSortDates();
