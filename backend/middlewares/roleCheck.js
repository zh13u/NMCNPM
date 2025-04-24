// Kiểm tra vai trò cho các hoạt động cụ thể
const Product = require('../models/Product');

exports.checkProductOwnership = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }
    
    // Admin có thể truy cập mọi sản phẩm
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Nhà cung cấp chỉ có thể truy cập sản phẩm của mình
    if (req.user.role === 'supplier' && 
        product.supplier.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Không có quyền truy cập sản phẩm này'
      });
    }
    
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi máy chủ'
    });
  }
};