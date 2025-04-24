const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Bảo vệ route - yêu cầu đăng nhập
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Kiểm tra header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Kiểm tra cookie
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // Kiểm tra token tồn tại
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Không được phép truy cập'
    });
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lấy thông tin người dùng
    req.user = await User.findById(decoded.id);
    
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Không được phép truy cập'
    });
  }
});

// Giới hạn quyền truy cập theo vai trò
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Không được phép truy cập'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Không có quyền truy cập tài nguyên này'
      });
    }
    
    next();
  };
};