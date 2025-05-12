require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout');

app.use(session({
  secret: 'securebetakey',
  resave: false,
  saveUninitialized: false
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

// Multer upload config
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/galleryUploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const uploadGallery = multer({ storage: galleryStorage });

const eboardStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/eboardUploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const uploadEboard = multer({ storage: eboardStorage });

// Public single-page route
app.get('/', async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  const lines = await Line.find().sort({ sortDate: 1 }); // ✅ SORT BY DATE NOW
  const members = await Eboard.find().sort({ createdAt: -1 });
  res.render('index', { images, lines, members });
});

// Contact form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  await Message.create({ name, email, message });
  res.redirect('/#contact');
});

// Admin login/logout
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
  const caption = req.body.caption;
  const file = req.file.filename;
  await GalleryImage.create({ file, caption });
  res.redirect('/admin/gallery');
});

app.post('/admin/gallery/delete/:id', checkAuth, async (req, res) => {
  const image = await GalleryImage.findById(req.params.id);
  const pathToDelete = path.join(__dirname, 'public/images/galleryUploads', image.file);
  fs.unlink(pathToDelete, () => {});
  await GalleryImage.findByIdAndDelete(req.params.id);
  res.redirect('/admin/gallery');
});

// Admin eboard
app.get('/admin/eboard', checkAuth, async (req, res) => {
  const members = await Eboard.find().sort({ createdAt: -1 });
  res.render('admin/eboard', { members, activePage: 'eboard' });
});

app.post('/admin/eboard', checkAuth, uploadEboard.single('image'), async (req, res) => {
  const { name, position } = req.body;
  const image = req.file.filename;
  await Eboard.create({ name, position, image });
  res.redirect('/admin/eboard');
});

app.get('/admin/eboard/edit/:id', checkAuth, async (req, res) => {
  const member = await Eboard.findById(req.params.id);
  res.render('admin/editEBoard', { member, activePage: 'eboard' });
});

app.post('/admin/eboard/edit/:id', checkAuth, async (req, res) => {
  const { name, position, image } = req.body;
  await Eboard.findByIdAndUpdate(req.params.id, { name, position, image });
  res.redirect('/admin/eboard');
});

app.post('/admin/eboard/delete/:id', checkAuth, async (req, res) => {
  const member = await Eboard.findById(req.params.id);
  const pathToDelete = path.join(__dirname, 'public/images/eboardUploads', member.image);
  fs.unlink(pathToDelete, () => {});
  await Eboard.findByIdAndDelete(req.params.id);
  res.redirect('/admin/eboard');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
