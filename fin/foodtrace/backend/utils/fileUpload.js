// fileUpload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Cấu hình lưu trữ cho multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Tạo thư mục con theo loại file
    let folder = 'misc';
    if (file.mimetype.startsWith('image/')) {
      folder = 'images';
    } else if (file.mimetype === 'application/pdf') {
      folder = 'documents';
    }
    
    const targetDir = path.join(uploadDir, folder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    // Tạo tên file ngẫu nhiên với extension gốc
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  }
});

// Kiểm tra loại file
const fileFilter = (req, file, cb) => {
  // Các loại file cho phép
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Loại file không được hỗ trợ'), false);
  }
};

// Cấu hình upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

/**
 * Xóa file đã upload
 * @param {String} filePath - Đường dẫn file cần xóa
 * @returns {Promise<Boolean>} - Kết quả xóa file
 */
const deleteFile = async (filePath) => {
  try {
    // Kiểm tra file tồn tại
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Lỗi khi xóa file:', error);
    throw new Error('Không thể xóa file');
  }
};

/**
 * Lấy đường dẫn public của file
 * @param {String} filePath - Đường dẫn file gốc
 * @returns {String} - Đường dẫn public
 */
const getPublicUrl = (filePath) => {
  // Trả về đường dẫn tương đối từ thư mục uploads
  const relativePath = path.relative(path.join(__dirname, '../uploads'), filePath);
  return `/uploads/${relativePath.replace(/\\/g, '/')}`;
};

module.exports = {
  upload,
  deleteFile,
  getPublicUrl
};
