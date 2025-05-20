// seedHome.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HomeContent from './models/HomeContent.js'; // adjust path if needed

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('✅ Connected to MongoDB');

  // Insert one homepage document
  const homepage = new HomeContent({
    title: 'Exotic Epsilon',
    heroImage: 'https://res.cloudinary.com/demo/image/upload/v123456789/sample.jpg',
    description: 'Welcome to the official homepage of Exotic Epsilon. This is where your journey begins.',
  });

  await HomeContent.deleteMany(); // Optional: wipe previous
  await homepage.save();

  console.log('✅ Homepage content seeded.');
  process.exit();
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
