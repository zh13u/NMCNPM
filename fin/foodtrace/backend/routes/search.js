const express = require('express');
const {
  searchProducts,
  trackProduct,
  getSearchHistory,
  getTrackingHistory,
  deleteSearchHistory
} = require('../controllers/searchController');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.get('/', searchProducts);
router.post('/track/:id', protect, trackProduct);
router.get('/history', protect, getSearchHistory);
router.get('/tracking-history', protect, getTrackingHistory);
router.delete('/history/:id', protect, deleteSearchHistory);

module.exports = router;