const mongoose = require('mongoose');

const ProductHistorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Vui lòng nhập tên sản phẩm'],
    trim: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['create', 'update', 'delete'],
    default: 'create'
  },
  qrCode: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Tạo index để tối ưu hiệu suất truy vấn
ProductHistorySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('ProductHistory', ProductHistorySchema); 