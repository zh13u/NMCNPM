const Product = require('../models/Product');
const SearchHistory = require('../models/SearchHistory');
const TrackingHistory = require('../models/TrackingHistory');
const asyncHandler = require('express-async-handler');

// @desc    Tìm kiếm sản phẩm
// @route   GET /api/search
// @access  Public
exports.searchProducts = asyncHandler(async (req, res) => {
  const { term } = req.query;
  
  if (!term) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng nhập từ khóa tìm kiếm'
    });
  }
  
  // Tìm kiếm sản phẩm theo tên, mô tả hoặc nguồn gốc
  const products = await Product.find({
    $or: [
      { name: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } },
      { origin: { $regex: term, $options: 'i' } }
    ]
  });
  
  // Lưu lịch sử tìm kiếm nếu đã đăng nhập
  if (req.user) {
    await SearchHistory.create({
      user: req.user.id,
      searchTerm: term,
      searchType: 'text'
    });
  }
  
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Lưu lịch sử truy xuất sản phẩm
// @route   POST /api/search/track/:id
// @access  Private
exports.trackProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy sản phẩm'
    });
  }
  
  // Tạo lịch sử truy xuất sản phẩm
  await TrackingHistory.create({
    user: req.user.id,
    product: req.params.id
  });
  
  res.status(200).json({
    success: true,
    message: 'Đã lưu lịch sử truy xuất'
  });
});

// @desc    Lấy lịch sử tìm kiếm của người dùng
// @route   GET /api/search/history
// @access  Private
exports.getSearchHistory = asyncHandler(async (req, res) => {
  const history = await SearchHistory.find({ user: req.user.id })
    .sort('-timestamp')
    .populate('user', 'name email');
  
  res.status(200).json({
    success: true,
    count: history.length,
    data: history
  });
});

// @desc    Lấy lịch sử truy xuất của người dùng
// @route   GET /api/search/tracking-history
// @access  Private
exports.getTrackingHistory = asyncHandler(async (req, res) => {
  const history = await TrackingHistory.find({ user: req.user.id })
    .sort('-timestamp')
    .populate({
      path: 'product',
      select: 'name origin harvestDate expiryDate qrCode'
    });
  
  res.status(200).json({
    success: true,
    count: history.length,
    data: history
  });
});

// @desc    Xóa lịch sử tìm kiếm
// @route   DELETE /api/search/history/:id
// @access  Private
exports.deleteSearchHistory = asyncHandler(async (req, res) => {
  const history = await SearchHistory.findById(req.params.id);
  
  if (!history) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy lịch sử tìm kiếm'
    });
  }
  
  // Kiểm tra người dùng có phải chủ của lịch sử tìm kiếm
  if (history.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Không có quyền xóa lịch sử này'
    });
  }
  
  await history.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});