const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const blockchainService = require('../../blockchain/interact');
const qrGenerator = require('../utils/qrGenerator');

// @desc    Lấy tất cả sản phẩm
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  let query;
  
  // Sao chép req.query
  const reqQuery = { ...req.query };
  
  // Các trường loại trừ
  const removeFields = ['select', 'sort', 'page', 'limit'];
  
  // Xóa các trường loại trừ khỏi reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  
  // Tạo chuỗi query
  let queryStr = JSON.stringify(reqQuery);
  
  // Tạo các toán tử ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  // Tìm kiếm sản phẩm
  query = Product.find(JSON.parse(queryStr));
  
  // Chọn trường
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  
  // Sắp xếp
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }
  
  // Phân trang
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments();
  
  query = query.skip(startIndex).limit(limit);
  
  // Thực thi query
  const products = await query;
  
  // Kết quả phân trang
  const pagination = {};
  
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }
  
  res.status(200).json({
    success: true,
    count: products.length,
    pagination,
    data: products
  });
});

// @desc    Lấy một sản phẩm
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy sản phẩm'
    });
  }
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Tạo sản phẩm mới
// @route   POST /api/products
// @access  Private (supplier, admin)
exports.createProduct = asyncHandler(async (req, res) => {
  // Thêm người dùng vào req.body
  req.body.supplier = req.user.id;
  
  // Tạo sản phẩm trong database
  let product = await Product.create(req.body);
  
  // Tạo mã QR
  const qrCode = await qrGenerator.generateQR(product._id);
  
  // Lưu dữ liệu lên blockchain
  const blockchainId = await blockchainService.addProduct({
    id: product._id.toString(),
    name: product.name,
    harvestDate: product.harvestDate,
    origin: product.origin,
    supplier: req.user.id
  });
  
  // Cập nhật sản phẩm với mã QR và blockchainId
  product = await Product.findByIdAndUpdate(
    product._id,
    { qrCode, blockchainId },
    { new: true, runValidators: true }
  );
  
  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Cập nhật sản phẩm
// @route   PUT /api/products/:id
// @access  Private (supplier, admin)
exports.updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  
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
  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  // Cập nhật thông tin trên blockchain
  await blockchainService.updateProduct({
    id: product._id.toString(),
    name: product.name,
    harvestDate: product.harvestDate,
    origin: product.origin
  });
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Xóa sản phẩm
// @route   DELETE /api/products/:id
// @access  Private (supplier, admin)
exports.deleteProduct = asyncHandler(async (req, res) => {
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
      message: 'Không có quyền xóa sản phẩm này'
    });
  }
  
  await product.remove();
  
  // Xóa thông tin trên blockchain
  await blockchainService.removeProduct(product._id.toString());
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Thêm thông tin theo dõi cho sản phẩm
// @route   POST /api/products/:id/tracking
// @access  Private (supplier, admin)
exports.addTrackingInfo = asyncHandler(async (req, res) => {
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
  
  // Thêm thông tin theo dõi
  product.trackingDetails.push({
    location: req.body.location,
    timestamp: new Date(),
    action: req.body.action,
    temperature: req.body.temperature,
    humidity: req.body.humidity
  });
  
  await product.save();
  
  // Cập nhật thông tin trên blockchain
  await blockchainService.addTrackingInfo({
    id: product._id.toString(),
    location: req.body.location,
    action: req.body.action,
    timestamp: new Date(),
    temperature: req.body.temperature,
    humidity: req.body.humidity
  });
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Tìm sản phẩm bằng mã QR
// @route   GET /api/products/qr/:qrCode
// @access  Public
exports.getProductByQR = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ qrCode: req.params.qrCode });
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy sản phẩm'
    });
  }
  
  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Lấy sản phẩm của nhà cung cấp
// @route   GET /api/products/supplier
// @access  Private (supplier)
exports.getSupplierProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ supplier: req.user.id });
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
});
  
// @desc    Xác thực sản phẩm trên blockchain
// @route   GET /api/products/:id/verify
// @access  Public
exports.verifyProduct = asyncHandler(async (req, res) => {
const product = await Product.findById(req.params.id);

if (!product) {
    return res.status(404).json({
    success: false,
    message: 'Không tìm thấy sản phẩm'
    });
}

// Xác thực sản phẩm trên blockchain
const verification = await blockchainService.verifyProduct(product.blockchainId);

res.status(200).json({
    success: true,
    data: {
    product,
    verification
    }
});
});