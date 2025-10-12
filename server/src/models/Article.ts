import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Article', articleSchema);