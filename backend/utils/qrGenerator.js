const QRCode = require('qrcode');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// Thư mục lưu QR code
const QR_DIR = path.join(__dirname, '../uploads/qrcodes');

// Đảm bảo thư mục tồn tại
if (!fs.existsSync(QR_DIR)) {
  fs.mkdirSync(QR_DIR, { recursive: true });
}

exports.generateQR = async (productId) => {
  try {
    // Tạo token để nhúng vào QR (có thể kết hợp productId và timestamp)
    const token = crypto.createHash('sha256')
      .update(`${productId}-${Date.now()}`)
      .digest('hex');
    
    // URL xác thực sản phẩm
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify/${token}`;
    
    // Tên file QR
    const qrFileName = `${productId}-${Date.now()}.png`;
    const qrFilePath = path.join(QR_DIR, qrFileName);
    
    // Tạo QR code
    await QRCode.toFile(qrFilePath, verifyUrl);
    
    // Trả về đường dẫn tương đối để lưu vào DB
    return `/uploads/qrcodes/${qrFileName}`;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};