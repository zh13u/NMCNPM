const Product = require('../models/Product');
const TrackingHistory = require('../models/TrackingHistory');
const asyncHandler = require('express-async-handler');
const blockchainService = require('../blockchain/interact');

// @desc    Lấy lịch sử truy xuất của sản phẩm
// @route   GET /api/tracking/:id
// @access  Public
exports.getProductTracking = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy sản phẩm'
    });
  }
  
  // Lấy thông tin theo dõi từ blockchain
  const blockchainTracking = await blockchainService.getProductTracking(product.blockchainId);
  
  res.status(200).json({
    success: true,
    data: {
      product,
      trackingDetails: product.trackingDetails,
      blockchainTracking
    }
  });
});

// @desc    Lấy thông tin sản phẩm từ QR code
// @route   GET /api/tracking/qr/:qrCode
// @access  Public
exports.getProductByQR = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ qrCode: req.params.qrCode });
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy sản phẩm'
    });
  }
  
  // Lưu lịch sử truy xuất nếu đã đăng nhập
  if (req.user) {
    await TrackingHistory.create({
      user: req.user.id,
      product: product._id
    });
  }
  
  // Lấy thông tin theo dõi từ blockchain
  const blockchainTracking = await blockchainService.getProductTracking(product.blockchainId);
  
  res.status(200).json({
    success: true,
    data: {
      product,
      trackingDetails: product.trackingDetails,
      blockchainTracking
    }
  });
});

// @desc    Thêm mốc theo dõi cho sản phẩm
// @route   POST /api/tracking/:id
// @access  Private (supplier, admin)
exports.addTrackingPoint = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy sản phẩm'
    });
  }
  
  // Kiểm tra người dùng có phải là nhà cung cấp của sản phẩm
  if (product.supplier.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Không có quyền cập nhật sản phẩm này'
    });
  }
  
  // Thêm điểm theo dõi mới
  const newTrackingPoint = {
    location: req.body.location,
    timestamp: req.body.timestamp || new Date(),
    action: req.body.action,
    temperature: req.body.temperature,
    humidity: req.body.humidity
  };
  
  product.trackingDetails.push(newTrackingPoint);
  await product.save();
  
  // Thêm thông tin lên blockchain
  await blockchainService.addTrackingInfo({
    id: product._id.toString(),
    ...newTrackingPoint
  });
  
  res.status(201).json({
    success: true,
    data: product
  });
});