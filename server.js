require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Session Setup
app.use(session({
  secret: 'securebetakey',
  resave: false,
  saveUninitialized: false
}));

// Auth Middleware
function checkAuth(req, res, next) {
  if (req.session.loggedIn) return next();
  res.redirect('/login');
}

// Models
const Message = require('./models/Message');
const Line = require('./models/Line');
const EBoard = require('./models/Eboard'); // ✅ fixed casing
const GalleryImage = require('./models/GalleryImage');

// Multer Configurations

// Gallery Uploads
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/galleryUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadGallery = multer({ storage: galleryStorage });

// E-Board Uploads
const eboardStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/eboardUploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const uploadEBoard = multer({ storage: eboardStorage });

// Routes

// Static pages
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/events', (req, res) => res.render('events'));
app.get('/thankyou', (req, res) => res.render('thankyou'));
app.get('/contact', (req, res) => res.render('contact'));

// Contact form submission
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.redirect('/thankyou');
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).send('Something went wrong.');
  }
});

// Public: Lines
app.get('/lines', async (req, res) => {
  try {
    const lines = await Line.find().sort({ createdAt: 1 });
    res.render('lines', { lines });
  } catch (err) {
    console.error('Error loading lines:', err);
    res.status(500).send('Error fetching lines.');
  }
});

// Public: E-Board
app.get('/eboard', async (req, res) => {
  try {
    const members = await EBoard.find().sort({ createdAt: -1 });
    res.render('eboard', { members });
  } catch (err) {
    console.error('Error loading E-Board:', err);
    res.status(500).send('Error loading E-Board');
  }
});

// Public: Gallery
app.get('/gallery', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: 1 });
    res.render('gallery', { images });
  } catch (err) {
    console.error('Error loading gallery:', err);
    res.status(500).send('Error loading gallery');
  }
});

// Admin: Login + Logout
app.get('/login', (req, res) => res.render('login', { error: null }));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    await bcrypt.compare(password, process.env.ADMIN_PASS)
  ) {
    req.session.loggedIn = true;
    return res.redirect('/admin');
  } else {
    return res.render('login', { error: 'Invalid credentials' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Admin: Messages
app.get('/admin', checkAuth, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.render('admin/index', { messages, activePage: 'messages' });
});

// Admin: Gallery
app.get('/admin/gallery', checkAuth, async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  res.render('admin/gallery', { images, activePage: 'gallery' });
});

app.post('/admin/gallery/upload', checkAuth, uploadGallery.single('image'), async (req, res) => {
  try {
    const caption = req.body.caption;
    const file = req.file.filename;
    await GalleryImage.create({ file, caption });
    res.redirect('/admin/gallery');
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).send("Upload failed.");
  }
});

app.post('/admin/gallery/delete/:id', checkAuth, async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).send("Image not found");

    const imagePath = path.join(__dirname, 'public/images/galleryUploads', image.file);
    fs.unlink(imagePath, err => {
      if (err) console.warn("File delete skipped:", err.message);
    });

    await GalleryImage.findByIdAndDelete(req.params.id);
    res.redirect('/admin/gallery');
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).send("Failed to delete image");
  }
});

// Admin: E-Board CRUD
app.get('/admin/eboard', checkAuth, async (req, res) => {
  const members = await EBoard.find().sort({ createdAt: -1 });
  res.render('admin/eboard', { members, activePage: 'eboard' });
});

app.post('/admin/eboard', checkAuth, uploadEBoard.single('image'), async (req, res) => {
  try {
    const { name, position } = req.body;
    const image = req.file.filename;
    await EBoard.create({ name, position, image });
    res.redirect('/admin/eboard');
  } catch (err) {
    console.error("E-Board upload failed:", err);
    res.status(500).send("Upload failed.");
  }
});

app.get('/admin/eboard/edit/:id', checkAuth, async (req, res) => {
  const member = await EBoard.findById(req.params.id);
  res.render('admin/editEBoard', { member, activePage: 'eboard' });
});

app.post('/admin/eboard/edit/:id', checkAuth, async (req, res) => {
  const { name, position, image } = req.body;
  await EBoard.findByIdAndUpdate(req.params.id, { name, position, image });
  res.redirect('/admin/eboard');
});

app.post('/admin/eboard/delete/:id', checkAuth, async (req, res) => {
  try {
    const member = await EBoard.findById(req.params.id);
    if (member?.image) {
      const filePath = path.join(__dirname, 'public/images/eboardUploads', member.image);
      fs.unlink(filePath, err => {
        if (err) console.warn("E-Board image not deleted:", err.message);
      });
    }
    await EBoard.findByIdAndDelete(req.params.id);
    res.redirect('/admin/eboard');
  } catch (err) {
    console.error("Failed to delete E-Board member:", err);
    res.status(500).send("Failed to delete member");
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
