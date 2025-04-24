const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  createProductHistory,
  getUserProductHistory
} = require('../controllers/productHistoryController');

router
  .route('/')
  .get(protect, getUserProductHistory)
  .post(protect, createProductHistory);

module.exports = router; 