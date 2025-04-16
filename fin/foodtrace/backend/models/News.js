const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tiêu đề'],
    trim: true,
    maxlength: [200, 'Tiêu đề không quá 200 ký tự']
  },
  content: {
    type: String,
    required: [true, 'Vui lòng nhập nội dung']
  },
  image: {
    type: String
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', NewsSchema);