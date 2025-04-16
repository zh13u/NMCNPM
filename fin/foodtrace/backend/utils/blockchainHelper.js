// blockchainHelper.js
const Web3 = require('web3');
const { createHash } = require('crypto');

// Kết nối với blockchain
const connectBlockchain = () => {
  try {
    const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER_URL);
    return web3;
  } catch (error) {
    console.error('Lỗi khi kết nối blockchain:', error);
    throw new Error('Không thể kết nối blockchain');
  }
};

/**
 * Tạo hash cho dữ liệu sản phẩm để lưu trên blockchain
 * @param {Object} productData - Dữ liệu sản phẩm
 * @returns {String} - Hash dữ liệu
 */
const createProductHash = (productData) => {
  // Tạo chuỗi dữ liệu từ thông tin sản phẩm
  const dataString = JSON.stringify(productData);
  
  // Tạo hash SHA-256
  return createHash('sha256').update(dataString).digest('hex');
};

/**
 * Xác thực tính toàn vẹn của dữ liệu sản phẩm
 * @param {Object} productData - Dữ liệu sản phẩm hiện tại
 * @param {String} storedHash - Hash đã lưu trên blockchain
 * @returns {Boolean} - Kết quả xác thực
 */
const verifyProductIntegrity = (productData, storedHash) => {
  const currentHash = createProductHash(productData);
  return currentHash === storedHash;
};

/**
 * Lấy thông tin sản phẩm từ blockchain
 * @param {String} productId - ID sản phẩm
 * @param {Object} contract - Smart contract instance
 * @returns {Promise<Object>} - Dữ liệu sản phẩm từ blockchain
 */
const getProductFromBlockchain = async (productId, contract) => {
  try {
    const productData = await contract.methods.getProduct(productId).call();
    return productData;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ blockchain:', error);
    throw new Error('Không thể lấy dữ liệu sản phẩm từ blockchain');
  }
};

/**
 * Lưu thông tin sản phẩm lên blockchain
 * @param {Object} productData - Dữ liệu sản phẩm
 * @param {Object} contract - Smart contract instance
 * @param {Object} account - Tài khoản người dùng
 * @returns {Promise<Object>} - Kết quả giao dịch
 */
const saveProductToBlockchain = async (productData, contract, account) => {
  try {
    // Tạo hash cho dữ liệu sản phẩm
    const productHash = createProductHash(productData);
    
    // Lưu lên blockchain
    const transaction = await contract.methods.addProduct(
      productData.id,
      productHash,
      productData.name,
      productData.origin,
      productData.productionDate,
      productData.expiryDate
    ).send({ from: account.address, gas: 500000 });
    
    return transaction;
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu lên blockchain:', error);
    throw new Error('Không thể lưu dữ liệu sản phẩm lên blockchain');
  }
};

/**
 * Cập nhật thông tin chuỗi cung ứng lên blockchain
 * @param {String} productId - ID sản phẩm
 * @param {Object} supplyChainData - Dữ liệu chuỗi cung ứng mới
 * @param {Object} contract - Smart contract instance
 * @param {Object} account - Tài khoản người dùng
 * @returns {Promise<Object>} - Kết quả giao dịch
 */
const updateSupplyChain = async (productId, supplyChainData, contract, account) => {
  try {
    // Tạo hash cho dữ liệu chuỗi cung ứng
    const supplyChainHash = createProductHash(supplyChainData);
    
    // Cập nhật lên blockchain
    const transaction = await contract.methods.updateSupplyChain(
      productId,
      supplyChainData.stage,
      supplyChainData.location,
      supplyChainData.timestamp,
      supplyChainData.handler,
      supplyChainHash
    ).send({ from: account.address, gas: 300000 });
    
    return transaction;
  } catch (error) {
    console.error('Lỗi khi cập nhật chuỗi cung ứng:', error);
    throw new Error('Không thể cập nhật thông tin chuỗi cung ứng');
  }
};

/**
 * Lấy lịch sử truy xuất của sản phẩm
 * @param {String} productId - ID sản phẩm
 * @param {Object} contract - Smart contract instance
 * @returns {Promise<Array>} - Lịch sử truy xuất
 */
const getProductHistory = async (productId, contract) => {
  try {
    const history = await contract.methods.getProductHistory(productId).call();
    return history;
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử sản phẩm:', error);
    throw new Error('Không thể lấy lịch sử sản phẩm từ blockchain');
  }
};

module.exports = {
  connectBlockchain,
  createProductHash,
  verifyProductIntegrity,
  getProductFromBlockchain,
  saveProductToBlockchain,
  updateSupplyChain,
  getProductHistory
};