import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  category: string;
  origin: string;
  harvestDate: Date;
  expiryDate: Date;
  supplier: mongoose.Types.ObjectId;
  blockchainId: string;
  qrCode: string;
  metadata?: Record<string, any>;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    trim: true
  },
  origin: {
    type: String,
    required: [true, 'Please provide a product origin'],
    trim: true
  },
  harvestDate: {
    type: Date,
    required: [true, 'Please provide a harvest date']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please provide an expiry date']
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a supplier']
  },
  blockchainId: {
    type: String,
    required: [true, 'Please provide a blockchain ID'],
    unique: true
  },
  qrCode: {
    type: String,
    required: [true, 'Please provide a QR code'],
    unique: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Add indexes for faster queries
ProductSchema.index({ name: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ supplier: 1 });
ProductSchema.index({ blockchainId: 1 });
ProductSchema.index({ qrCode: 1 });
ProductSchema.index({ harvestDate: -1 });
ProductSchema.index({ expiryDate: -1 });

// Add virtual fields for populated data
ProductSchema.virtual('supplierDetails', {
  ref: 'User',
  localField: 'supplier',
  foreignField: '_id',
  justOne: true
});

ProductSchema.virtual('transactions', {
  ref: 'Transaction',
  localField: '_id',
  foreignField: 'product'
});

// Set toJSON options to include virtuals
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

// Add pre-save hook to validate dates
ProductSchema.pre('save', function(next) {
  if (this.harvestDate > this.expiryDate) {
    next(new Error('Harvest date cannot be after expiry date'));
  }
  next();
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product; 