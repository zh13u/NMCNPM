const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Load contract ABI and address
const contractPath = path.resolve(__dirname, './contracts/FoodTraceability.json');
const contractData = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const contractABI = contractData.abi;
const contractAddress = contractData.address; // Lấy địa chỉ từ file JSON

// Initialize Web3
const web3 = new Web3(process.env.BLOCKCHAIN_PROVIDER || 'http://localhost:7545');

// Get contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Tài khoản mặc định
const defaultAccount = process.env.DEFAULT_ACCOUNT || web3.eth.accounts[0];

// Thêm sản phẩm mới lên blockchain
exports.addProduct = async (productData) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];

    const result = await contract.methods.addEvent(
      productData.id,
      productData.name,
      productData.supplierId,
      'Production Facility',
      'Production',
      'Good',
      `Produced on ${productData.productionDate}, Expires on ${productData.expiryDate}, Batch: ${productData.batchNumber}`
    ).send({ 
      from: fromAddress,
      gas: '3000000'
    });

    return {
      hash: result.transactionHash
    };
  } catch (error) {
    console.error('Error adding product to blockchain:', error);
    throw new Error('Failed to add product to blockchain');
  }
};

// Cập nhật thông tin sản phẩm
exports.updateProduct = async (productData) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];

    const result = await contract.methods.addEvent(
      productData.id,
      productData.name,
      'System',
      productData.origin || 'N/A',
      'Update',
      'Good',
      `Updated information at ${new Date().toISOString()}`
    ).send({ 
      from: fromAddress,
      gas: '3000000'
    });

    return {
      hash: result.transactionHash
    };
  } catch (error) {
    console.error('Error updating product on blockchain:', error);
    throw error;
  }
};

// Thêm thông tin tracking
exports.addTrackingInfo = async (trackingData) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];

    const result = await contract.methods.addEvent(
      trackingData.id,
      trackingData.productName || '',
      trackingData.actor || 'System',
      trackingData.location,
      trackingData.action,
      'Good',
      `Temperature: ${trackingData.temperature}°C, Humidity: ${trackingData.humidity}%`
    ).send({ 
      from: fromAddress,
      gas: '3000000'
    });

    return {
      hash: result.transactionHash
    };
  } catch (error) {
    console.error('Error adding tracking info to blockchain:', error);
    throw error;
  }
};

// Xác thực sản phẩm
exports.verifyProduct = async (productId) => {
  try {
    const events = await contract.methods.getEvents(productId).call();
    
    if (!events || events.length === 0) {
      return {
        verified: false,
        reason: 'Product not found in blockchain'
      };
    }

    return {
      verified: true,
      events: events
    };
  } catch (error) {
    console.error('Error verifying product from blockchain:', error);
    return {
      verified: false,
      reason: error.message
    };
  }
};

// Loại bỏ sản phẩm (không thực sự xóa, chỉ đánh dấu)
exports.removeProduct = async (productId) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];

    const result = await contract.methods.addEvent(
      productId,
      '',
      'System',
      'N/A',
      'Deleted',
      'Removed',
      `Product removed from system at ${new Date().toISOString()}`
    ).send({ 
      from: fromAddress,
      gas: '3000000'
    });

    return {
      hash: result.transactionHash
    };
  } catch (error) {
    console.error('Error removing product from blockchain:', error);
    throw error;
  }
};

// Export functions
module.exports = {
  addProduct: exports.addProduct,
  updateProduct: exports.updateProduct,
  addTrackingInfo: exports.addTrackingInfo,
  verifyProduct: exports.verifyProduct,
  removeProduct: exports.removeProduct,
  getProduct: async (productId) => {
    try {
      const events = await contract.methods.getEvents(productId).call();
      
      if (!events || events.length === 0) {
        return {
          isValid: false
        };
      }

      return {
        isValid: true,
        productData: events[0]
      };
    } catch (error) {
      console.error('Error getting product from blockchain:', error);
      return {
        isValid: false
      };
    }
  }
};