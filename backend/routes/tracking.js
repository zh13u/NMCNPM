const express = require('express');
const {
  getProductTracking,
  getProductByQR,
  addTrackingPoint
} = require('../controllers/trackingController');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');
const { checkProductOwnership } = require('../middlewares/roleCheck');

router.get('/:id', getProductTracking);
router.get('/qr/:qrCode', getProductByQR);
router.post('/:id', protect, authorize('supplier', 'admin'), checkProductOwnership, addTrackingPoint);

module.exports = router;