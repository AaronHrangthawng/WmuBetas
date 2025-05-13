
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const multer = require('multer');
const expressLayouts = require('express-ejs-layouts');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
console.log("🔍 Cloudinary configured for:", process.env.CLOUD_NAME);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(session({
  secret: 'securebetakey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
}));

function checkAuth(req, res, next) {
  if (req.session.loggedIn) return next();
  res.redirect('/login');
}

// Models
const Message = require('./models/Message');
const Line = require('./models/Line');
const Eboard = require('./models/Eboard');
const GalleryImage = require('./models/GalleryImage');

// Cloudinary upload storage
const galleryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'galleryUploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif']
  }
});
const uploadGallery = multer({ storage: galleryStorage });

const eboardStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'eboardUploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif']
  }
});
const uploadEboard = multer({ storage: eboardStorage });

// Routes
app.get('/', async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  const lines = await Line.find().sort({ _id: 1 });
  const members = await Eboard.find().sort({ createdAt: -1 });
  res.render('index', { images, lines, members });
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  await Message.create({ name, email, message });
  res.redirect('/#contact');
});

app.get('/login', (req, res) => res.render('login', { error: null }));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    await bcrypt.compare(password, process.env.ADMIN_PASS)
  ) {
    req.session.loggedIn = true;
    res.redirect('/admin');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Admin dashboard
app.get('/admin', checkAuth, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.render('admin/index', { messages, activePage: 'messages' });
});

// Admin gallery
app.get('/admin/gallery', checkAuth, async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  res.render('admin/gallery', { images, activePage: 'gallery' });
});

app.post('/admin/gallery/upload', checkAuth, uploadGallery.single('image'), async (req, res) => {
  console.log("REQ.FILE (Gallery):", req.file);
  const caption = req.body.caption;
  const file = req.file?.path || "upload_failed";
  await GalleryImage.create({ file, caption });
  res.redirect('/admin/gallery');
});

app.post('/admin/gallery/delete/:id', checkAuth, async (req, res) => {
  await GalleryImage.findByIdAndDelete(req.params.id);
  res.redirect('/admin/gallery');
});

// Admin eboard
app.get('/admin/eboard', checkAuth, async (req, res) => {
  const members = await Eboard.find().sort({ createdAt: -1 });
  res.render('admin/eboard', { members, activePage: 'eboard' });
});

app.post('/admin/eboard', checkAuth, uploadEboard.single('image'), async (req, res) => {
  console.log("REQ.FILE (Eboard):", req.file);
  const { name, position } = req.body;
  const image = req.file?.path || "upload_failed";
  await Eboard.create({ name, position, image });
  res.redirect('/admin/eboard');
});

app.get('/admin/eboard/edit/:id', checkAuth, async (req, res) => {
  const member = await Eboard.findById(req.params.id);
  res.render('admin/editEBoard', { member, activePage: 'eboard' });
});

app.post('/admin/eboard/edit/:id', checkAuth, uploadEboard.single('image'), async (req, res) => {
  const { name, position, existingImage } = req.body;
  const image = req.file?.path || existingImage;
  await Eboard.findByIdAndUpdate(req.params.id, { name, position, image });
  res.redirect('/admin/eboard');
});

app.post('/admin/eboard/delete/:id', checkAuth, async (req, res) => {
  await Eboard.findByIdAndDelete(req.params.id);
  res.redirect('/admin/eboard');
});

// GET route to load gallery edit form
app.get('/admin/gallery/edit/:id', checkAuth, async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);
  res.render('admin/editGallery', { image, activePage: 'gallery' });
});

// POST route to update image or caption
app.post('/admin/gallery/edit/:id', checkAuth, uploadGallery.single('image'), async (req, res) => {
  const { caption, existingFile } = req.body;
  const file = req.file?.path || existingFile;
  await GalleryImage.findByIdAndUpdate(req.params.id, { file, caption });
  res.redirect('/admin/gallery');
});


// DEBUG route
app.get('/debug/env', (req, res) => {
  res.json({
    MONGO_URI: process.env.MONGO_URI ? '✅ set' : '❌ missing',
    CLOUD_NAME: process.env.CLOUD_NAME || '❌ missing',
    CLOUD_API_KEY: process.env.CLOUD_API_KEY ? '✅ set' : '❌ missing',
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET ? '✅ set' : '❌ missing',
    ADMIN_USER: process.env.ADMIN_USER || '❌ missing',
    ADMIN_PASS: process.env.ADMIN_PASS ? '✅ set' : '❌ missing'
  });
});


app.post('/admin/gallery/edit/:id', checkAuth, uploadGallery.single('image'), async (req, res) => {
  const { caption, existingFile } = req.body;
  const file = req.file?.path || existingFile;
  await GalleryImage.findByIdAndUpdate(req.params.id, { file, caption });
  res.redirect('/admin/gallery');
});


// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
