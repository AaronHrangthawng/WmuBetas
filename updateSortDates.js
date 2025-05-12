const mongoose = require('mongoose');
const Line = require('./models/Line');
require('dotenv').config();

async function updateSortDates() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const lines = await Line.find();

  for (const line of lines) {
    const rawDate = line.date;

    // Try to extract a real date string (e.g. "May 1, 2024")
    const match = rawDate.match(/([A-Za-z]+ \d{1,2}, \d{4})/);

    if (!match) {
      console.warn(`❌ Could not parse date from: ${rawDate}`);
      continue;
    }

    const parsed = new Date(match[1]);
    if (isNaN(parsed)) {
      console.warn(`❌ Invalid date format: ${match[1]}`);
      continue;
    }

    const sortDate = parsed.toISOString().split('T')[0]; // "YYYY-MM-DD"

    line.sortDate = sortDate;
    await line.save();

    console.log(`✅ Updated ${line.title} → ${sortDate}`);
  }

  await mongoose.disconnect();
  console.log('All done ✅');
}

updateSortDates();
