const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const { sendEmail } = require('../utils/emailService');

// @desc    Đăng ký người dùng
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      businessName, 
      businessType, 
      address, 
      phone, 
      taxCode,
      role 
    } = req.body;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng. Vui lòng chọn email khác.'
      });
    }

    // Kiểm tra role (không cho phép đăng ký admin)
    if (role === 'admin') {
      return res.status(400).json({
        success: false,
        message: 'Không thể đăng ký tài khoản admin'
      });
    }

    // Xác định vai trò người dùng
    const userRole = role || (businessName ? 'supplier' : 'user');
    
    // Tạo object dữ liệu người dùng
    const userData = {
      name: firstName && lastName ? `${firstName} ${lastName}` : req.body.name || 'Người dùng',
      firstName,
      lastName,
      email,
      password,
      businessName,
      businessType,
      address,
      phone,
      taxCode,
      role: userRole
    };

    // Tạo người dùng mới
    const user = await User.create(userData);

    sendTokenResponse(user, 201, res);
});

// @desc    Đăng nhập
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Vui lòng nhập email và mật khẩu'
    });
  }

  // Kiểm tra người dùng
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Thông tin đăng nhập không hợp lệ'
    });
  }

  // Kiểm tra mật khẩu
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Thông tin đăng nhập không hợp lệ'
    });
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Đăng xuất
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Lấy thông tin người dùng hiện tại
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Quên mật khẩu
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Không tìm thấy email'
    });
  }

  // Tạo token đặt lại mật khẩu
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Tạo URL đặt lại mật khẩu
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

  const message = `Bạn nhận được email này vì bạn đã yêu cầu đặt lại mật khẩu. Vui lòng truy cập: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Đặt lại mật khẩu',
      message
    });

    res.status(200).json({
      success: true,
      message: 'Email đã được gửi'
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      success: false,
      message: 'Không thể gửi email'
    });
  }
});

// @desc    Đặt lại mật khẩu
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res) => {
  // Lấy token được mã hóa
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }

  // Đặt mật khẩu mới
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Cập nhật thông tin người dùng
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Cập nhật mật khẩu
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('+password');

  // Kiểm tra mật khẩu hiện tại
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(401).json({
      success: false,
      message: 'Mật khẩu hiện tại không đúng'
    });
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Helper function để gửi token response
const sendTokenResponse = (user, statusCode, res) => {
    // Tạo token
    const token = user.getSignedJwtToken();

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // Đây là số ngày, nên hợp lệ
      ),
      httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
      options.secure = true;
    }

    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
};
