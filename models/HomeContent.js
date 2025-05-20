import mongoose from 'mongoose';

const HomeContentSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'Welcome to Exotic Epsilon' },
  heroSubtitle: { type: String, default: 'Where Brotherhood, Scholarship, Leadership, and Service meet.' },
  heroImage: { type: String, default: '' },
  aboutText: { type: String, default: 'This is where your about section content goes.' },
  logoImage: { type: String, default: '' }  // ✅ NEW FIELD
}, { timestamps: true });


export default mongoose.model('HomeContent', HomeContentSchema);
