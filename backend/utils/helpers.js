// helpers.js
const crypto = require('crypto');
const moment = require('moment');

/**
 * Tạo token ngẫu nhiên cho reset mật khẩu
 * @returns {String} - Token ngẫu nhiên
 */
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Tạo mã hash cho một chuỗi với salt
 * @param {String} data - Chuỗi cần hash
 * @returns {String} - Chuỗi đã được hash
 */
const hashData = (data) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(data, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
};

/**
 * Kiểm tra hash của chuỗi
 * @param {String} data - Chuỗi cần kiểm tra
 * @param {String} hash - Hash đã lưu
 * @param {String} salt - Salt đã sử dụng
 * @returns {Boolean} - Kết quả kiểm tra
 */
const verifyHash = (data, hash, salt) => {
  const currentHash = crypto.pbkdf2Sync(data, salt, 1000, 64, 'sha512').toString('hex');
  return currentHash === hash;
};

/**
 * Format ngày tháng
 * @param {Date} date - Ngày cần format
 * @param {String} format - Định dạng (mặc định: DD/MM/YYYY)
 * @returns {String} - Chuỗi ngày tháng đã format
 */
const formatDate = (date, format = 'DD/MM/YYYY') => {
  return moment(date).format(format);
};

/**
 * Tính khoảng cách thời gian giữa hai ngày
 * @param {Date} date1 - Ngày thứ nhất
 * @param {Date} date2 - Ngày thứ hai
 * @param {String} unit - Đơn vị (days, months, years)
 * @returns {Number} - Khoảng cách thời gian
 */
const dateDiff = (date1, date2, unit = 'days') => {
  return moment(date1).diff(moment(date2), unit);
};

/**
 * Sinh mã sản phẩm theo định dạng
 * @param {String} prefix - Tiền tố cho mã
 * @returns {String} - Mã sản phẩm
 */
const generateProductCode = (prefix = 'PRD') => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Lọc đối tượng để loại bỏ các trường null hoặc undefined
 * @param {Object} obj - Đối tượng cần lọc
 * @returns {Object} - Đối tượng đã lọc
 */
const filterObject = (obj) => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== null && value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

/**
 * Phân trang dữ liệu
 * @param {Array} data - Mảng dữ liệu
 * @param {Number} page - Số trang
 * @param {Number} limit - Số lượng mục trên mỗi trang
 * @returns {Object} - Dữ liệu đã phân trang
 */
const paginateData = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }

  results.totalPages = Math.ceil(data.length / limit);
  results.currentPage = page;
  results.totalItems = data.length;
  results.results = data.slice(startIndex, endIndex);

  return results;
};

module.exports = {
  generateResetToken,
  hashData,
  verifyHash,
  formatDate,
  dateDiff,
  generateProductCode,
  filterObject,
  paginateData
};