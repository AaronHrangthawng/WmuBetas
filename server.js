import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Cloudinary setup
import { v2 as cloudinary } from 'cloudinary';

// Route imports
import homeRoutes from './routes/homeRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import principlesRoutes from './routes/principlesRoutes.js';
import firmRoutes from './routes/firmRoutes.js';
import eboardRoutes from './routes/eboardRoutes.js';
import linesRoutes from './routes/lineRoutes.js';
import newGalleryRoutes from "./routes/newGalleryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
console.log("🔍 Cloudinary configured for:", process.env.CLOUD_NAME);


// Routes
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/principles', principlesRoutes);
app.use('/api/firm', firmRoutes);
app.use('/api/eboards', eboardRoutes);
app.use('/api/lines', linesRoutes);
app.use("/api/new-gallery", newGalleryRoutes);
app.use("/api/upload", uploadRoutes);


// Test endpoint
app.get('/', (req, res) => {
  res.send('🌐 Exotic Epsilon API is running...');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ message: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
