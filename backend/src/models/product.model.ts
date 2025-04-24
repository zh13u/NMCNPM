import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  productionDate: {
    type: Date,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  batchNumber: {
    type: String,
    required: true
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  qrCode: {
    type: String,
    required: true
  },
  blockchainTx: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'recalled'],
    default: 'active'
  }
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema); 