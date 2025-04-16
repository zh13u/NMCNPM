// Temporary mock version of interact.js
module.exports = {
    getAllProducts: async () => { return []; },
    getProductById: async (id) => { return null; },
    addProduct: async (data) => { return { success: true, txHash: "mock_hash" }; },
    updateProductStatus: async (id, newStatus) => { return { success: true, txHash: "mock_hash" }; },
    // Add any other functions your app needs
  };