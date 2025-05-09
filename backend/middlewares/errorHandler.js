const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err);

  // Mongoose lỗi ID không hợp lệ
  if (err.name === 'CastError') {
    const message = `Không tìm thấy tài nguyên với ID: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose lỗi trùng lặp
  if (err.code === 11000) {
    const message = 'Dữ liệu đã tồn tại';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose lỗi validation
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Lỗi máy chủ'
  });
};

module.exports = errorHandler;