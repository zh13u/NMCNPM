const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên sản phẩm'],
    trim: true,
    maxlength: [100, 'Tên sản phẩm không quá 100 ký tự']
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả sản phẩm'],
    maxlength: [500, 'Mô tả không quá 500 ký tự']
  },
  category: {
    type: String,
    required: [true, 'Vui lòng chọn danh mục sản phẩm'],
    enum: [
      'Rau củ',
      'Trái cây',
      'Thịt',
      'Hải sản',
      'Đồ uống',
      'Khác'
    ]
  },
  origin: {
    type: String,
    required: [true, 'Vui lòng nhập nguồn gốc sản phẩm']
  },
  harvestDate: {
    type: Date,
    required: [true, 'Vui lòng nhập ngày thu hoạch']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Vui lòng nhập hạn sử dụng']
  },
  images: [String],
  supplier: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  qrCode: {
    type: String,
    unique: true
  },
  blockchainId: {
    type: String
  },
  trackingDetails: [{
    location: String,
    timestamp: Date,
    action: String,
    temperature: Number,
    humidity: Number
  }],
  certifications: [{
    name: String,
    issuedBy: String,
    issuedDate: Date,
    expiryDate: Date,
    documentUrl: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Tạo index tìm kiếm
ProductSchema.index({ name: 'text', description: 'text', origin: 'text' });

module.exports = mongoose.model('Product', ProductSchema);