// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const { connectDB } = require('./config/database');
const logger = require('./utils/logger');
const fetch = require('node-fetch');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const searchRoutes = require('./routes/search');
const trackingRoutes = require('./routes/tracking');
const productHistoryRoutes = require('./routes/productHistory');

// Load biến môi trường
dotenv.config();

// Khởi tạo express app
const app = express();

// Kết nối database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(helmet()); // Bảo mật HTTP header

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: message => logger.info(message.trim())
    }
  }));
}

// Đường dẫn tĩnh cho uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/product-history', productHistoryRoutes);

// Xử lý lỗi 404
app.use((req, res, next) => {
  const error = new Error(`Không tìm thấy - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Log lỗi
  if (statusCode >= 500) {
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(err.stack);
  } else {
    logger.warn(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  }
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    }
  });
});

// Serve React App trong môi trường production
if (process.env.NODE_ENV === 'production') {
  // Set thư mục static
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  // Mọi request không phải API sẽ load index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Port & Server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`Máy chủ đang chạy ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} trên cổng ${PORT}`);
});

// Xử lý lỗi không xử lý được
process.on('uncaughtException', (error) => {
  logger.error('UNCAUGHT EXCEPTION! Đang tắt...');
  logger.error(error.name, error.message, error.stack);
  process.exit(1);
});

// Xử lý promise rejection không xử lý được
process.on('unhandledRejection', (error) => {
  logger.error('UNHANDLED REJECTION! Đang tắt...');
  logger.error(error);
  
  // Đóng server một cách nhẹ nhàng
  server.close(() => {
    process.exit(1);
  });
});

// Xử lý tín hiệu SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Đang tắt máy chủ một cách nhẹ nhàng');
  server.close(() => {
    logger.info('Process terminated!');
  });
});

module.exports = app;