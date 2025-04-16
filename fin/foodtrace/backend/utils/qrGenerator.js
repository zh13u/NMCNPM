// qrGenerator.js
const QRCode = require('qrcode');

/**
 * Tạo mã QR dựa trên thông tin sản phẩm
 * @param {Object} productData - Dữ liệu sản phẩm cần tạo mã QR
 * @param {String} format - Định dạng đầu ra ('png', 'svg', 'url')
 * @returns {Promise<String>} - URL hoặc chuỗi dữ liệu của mã QR
 */
const generateProductQR = async (productId, format = 'url') => {
  try {
    // Tạo URL truy xuất cho sản phẩm
    const trackingUrl = `${process.env.FRONT_END_URL}/product/${productId}`;
    
    let options = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
    };
    
    // Trả về các định dạng khác nhau tùy theo yêu cầu
    if (format === 'png') {
      return await QRCode.toDataURL(trackingUrl, options);
    } else if (format === 'svg') {
      return await QRCode.toString(trackingUrl, { type: 'svg' });
    } else {
      return await QRCode.toDataURL(trackingUrl, options);
    }
  } catch (error) {
    console.error('Lỗi khi tạo mã QR:', error);
    throw new Error('Không thể tạo mã QR');
  }
};

module.exports = {
  generateProductQR
};