const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  searchTerm: {
    type: String,
    required: true
  },
  searchType: {
    type: String,
    enum: ['text', 'qr'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);