const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Lấy tất cả người dùng
// @route   GET /api/users
// @access  Private (admin)
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// @desc    Lấy một người dùng
// @route   GET /api/users/:id
// @access  Private (admin)
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy người dùng'
    });
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Tạo người dùng mới
// @route   POST /api/users
// @access  Private (admin)
exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  
  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Cập nhật người dùng
// @route   PUT /api/users/:id
// @access  Private (admin)
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy người dùng'
    });
  }
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Xóa người dùng
// @route   DELETE /api/users/:id
// @access  Private (admin)
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy người dùng'
    });
  }
  
  await user.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});