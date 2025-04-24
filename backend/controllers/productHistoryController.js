const ProductHistory = require('../models/ProductHistory');
const asyncHandler = require('express-async-handler');

// @desc    Tạo lịch sử khi thêm sản phẩm mới
// @route   POST /api/product-history
// @access  Private
const createProductHistory = asyncHandler(async (req, res) => {
  const { productName, productId, qrCode } = req.body;

  const history = await ProductHistory.create({
    productName,
    productId,
    user: req.user.id,
    qrCode,
    action: 'create'
  });

  res.status(201).json({
    success: true,
    data: history
  });
});

// @desc    Lấy lịch sử hoạt động của người dùng
// @route   GET /api/product-history
// @access  Private
const getUserProductHistory = asyncHandler(async (req, res) => {
  const histories = await ProductHistory.find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('user', 'name email');

  res.status(200).json({
    success: true,
    count: histories.length,
    data: histories
  });
});

module.exports = {
  createProductHistory,
  getUserProductHistory
}; 