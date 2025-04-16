// emailService.js
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

// Tạo transporter cho nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Đọc và biên dịch template email
 * @param {String} templateName - Tên template
 * @param {Object} data - Dữ liệu để render template
 * @returns {String} - HTML đã biên dịch
 */
const compileTemplate = (templateName, data) => {
  const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
  const source = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(source);
  return template(data);
};

/**
 * Gửi email
 * @param {Object} options - Các tùy chọn email
 * @returns {Promise<Object>} - Kết quả gửi email
 */
const sendEmail = async (options) => {
  try {
    // Cấu hình email
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>`,
      to: options.to,
      subject: options.subject,
      html: options.html
    };
    
    // Thêm CC nếu có
    if (options.cc) {
      mailOptions.cc = options.cc;
    }
    
    // Thêm BCC nếu có
    if (options.bcc) {
      mailOptions.bcc = options.bcc;
    }
    
    // Thêm đính kèm nếu có
    if (options.attachments) {
      mailOptions.attachments = options.attachments;
    }
    
    // Gửi email
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Error sending email:', error);
    throw new Error('Không thể gửi email');
  }
};

/**
 * Gửi email xác nhận đăng ký
 * @param {Object} user - Thông tin người dùng
 * @param {String} verificationToken - Token xác thực
 * @returns {Promise<Object>} - Kết quả gửi email
 */
const sendVerificationEmail = async (user, verificationToken) => {
  // Tạo URL xác thực
  const verificationUrl = `${process.env.FRONT_END_URL}/verify-email?token=${verificationToken}`;
  
  // Render template
  const html = compileTemplate('verification', {
    name: user.username,
    verificationUrl
  });
  
  // Gửi email
  return await sendEmail({
    to: user.email,
    subject: 'Xác nhận đăng ký tài khoản',
    html
  });
};

/**
 * Gửi email đặt lại mật khẩu
 * @param {Object} user - Thông tin người dùng
 * @param {String} resetToken - Token đặt lại mật khẩu
 * @returns {Promise<Object>} - Kết quả gửi email
 */
const sendPasswordResetEmail = async (user, resetToken) => {
  // Tạo URL đặt lại mật khẩu
  const resetUrl = `${process.env.FRONT_END_URL}/reset-password?token=${resetToken}`;
  
  // Render template
  const html = compileTemplate('password-reset', {
    name: user.username,
    resetUrl
  });
  
  // Gửi email
  return await sendEmail({
    to: user.email,
    subject: 'Đặt lại mật khẩu',
    html
  });
};

/**
 * Gửi email thông báo sản phẩm mới
 * @param {Array} subscribers - Danh sách người đăng ký
 * @param {Object} product - Thông tin sản phẩm
 * @returns {Promise<Array>} - Kết quả gửi email
 */
const sendNewProductNotification = async (subscribers, product) => {
  // Render template
  const html = compileTemplate('new-product', {
    productName: product.name,
    productDescription: product.description,
    productImage: product.images[0], // Hình ảnh đầu tiên
    productUrl: `${process.env.FRONT_END_URL}/product/${product._id}`
  });
  
  // Gửi email cho tất cả người đăng ký
  const results = [];
  for (const subscriber of subscribers) {
    try {
      const result = await sendEmail({
        to: subscriber.email,
        subject: `Sản phẩm mới: ${product.name}`,
        html
      });
      results.push(result);
    } catch (error) {
      logger.error(`Error sending email to ${subscriber.email}:`, error);
      results.push({ error: error.message, email: subscriber.email });
    }
  }
  
  return results;
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendNewProductNotification
};