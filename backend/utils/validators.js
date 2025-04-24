// validators.js
const Joi = require('joi');

/**
 * Validator cho đăng ký người dùng
 */
const registerValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required()
    .messages({
      'string.empty': 'Tên đăng nhập không được để trống',
      'string.min': 'Tên đăng nhập phải có ít nhất {#limit} ký tự',
      'string.max': 'Tên đăng nhập không được vượt quá {#limit} ký tự',
      'string.alphanum': 'Tên đăng nhập chỉ được chứa chữ cái và số'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email không được để trống',
      'string.email': 'Email không hợp lệ'
    }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': 'Mật khẩu không được để trống',
      'string.min': 'Mật khẩu phải có ít nhất {#limit} ký tự'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Mật khẩu xác nhận không khớp',
      'string.empty': 'Vui lòng xác nhận mật khẩu'
    }),
  role: Joi.string().valid('user', 'supplier').default('user'),
  phone: Joi.string().pattern(/^[0-9]{10,11}$/).optional()
    .messages({
      'string.pattern.base': 'Số điện thoại không hợp lệ'
    }),
});

/**
 * Validator cho đăng nhập
 */
const loginValidator = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email không được để trống',
      'string.email': 'Email không hợp lệ'
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': 'Mật khẩu không được để trống'
    }),
});

/**
 * Validator cho sản phẩm
 */
const productValidator = Joi.object({
  name: Joi.string().min(3).max(100).required()
    .messages({
      'string.empty': 'Tên sản phẩm không được để trống',
      'string.min': 'Tên sản phẩm phải có ít nhất {#limit} ký tự',
      'string.max': 'Tên sản phẩm không được vượt quá {#limit} ký tự'
    }),
  description: Joi.string().min(10).required()
    .messages({
      'string.empty': 'Mô tả sản phẩm không được để trống',
      'string.min': 'Mô tả sản phẩm phải có ít nhất {#limit} ký tự'
    }),
  origin: Joi.string().required()
    .messages({
      'string.empty': 'Nguồn gốc sản phẩm không được để trống'
    }),
  productionDate: Joi.date().required()
    .messages({
      'date.base': 'Ngày sản xuất không hợp lệ',
      'any.required': 'Ngày sản xuất không được để trống'
    }),
  expiryDate: Joi.date().greater(Joi.ref('productionDate')).required()
    .messages({
      'date.base': 'Hạn sử dụng không hợp lệ',
      'date.greater': 'Hạn sử dụng phải sau ngày sản xuất',
      'any.required': 'Hạn sử dụng không được để trống'
    }),
  images: Joi.array().items(Joi.string()).min(1)
    .messages({
      'array.min': 'Phải có ít nhất một hình ảnh sản phẩm'
    }),
  certifications: Joi.array().items(Joi.string()),
  price: Joi.number().positive().required()
    .messages({
      'number.base': 'Giá sản phẩm phải là số',
      'number.positive': 'Giá sản phẩm phải là số dương',
      'any.required': 'Giá sản phẩm không được để trống'
    }),
  category: Joi.string().required()
    .messages({
      'string.empty': 'Danh mục sản phẩm không được để trống'
    }),
  supplier: Joi.string().required()
    .messages({
      'string.empty': 'Nhà cung cấp không được để trống'
    }),
  // Thông tin chuỗi cung ứng
  supplyChain: Joi.array().items(Joi.object({
    stage: Joi.string().required(),
    location: Joi.string().required(),
    timestamp: Joi.date().required(),
    description: Joi.string(),
    handler: Joi.string().required()
  })),
});

module.exports = {
  registerValidator,
  loginValidator,
  productValidator,
};