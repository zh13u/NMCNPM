const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addTrackingInfo,
  getProductByQR,
  getSupplierProducts,
  verifyProduct
} = require('../controllers/productController');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');
const { checkProductOwnership } = require('../middlewares/roleCheck');

router.route('/')
  .get(getProducts)
  .post(protect, authorize('supplier', 'admin'), createProduct);

router.route('/supplier')
  .get(protect, authorize('supplier', 'admin'), getSupplierProducts);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('supplier', 'admin'), checkProductOwnership, updateProduct)
  .delete(protect, authorize('supplier', 'admin'), checkProductOwnership, deleteProduct);

router.get('/qr/:qrCode', getProductByQR);
router.get('/:id/verify', verifyProduct);
router.post('/:id/tracking', protect, authorize('supplier', 'admin'), checkProductOwnership, addTrackingInfo);

module.exports = router;