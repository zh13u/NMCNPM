import mongoose from 'mongoose';

export interface ITransaction extends mongoose.Document {
  product: mongoose.Types.ObjectId;
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  timestamp: Date;
  location: string;
  blockchainId: string;
  metadata?: Record<string, any>;
}

const TransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product']
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a sender']
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a receiver']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true
  },
  blockchainId: {
    type: String,
    required: [true, 'Please provide a blockchain ID'],
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
TransactionSchema.index({ product: 1 });
TransactionSchema.index({ from: 1 });
TransactionSchema.index({ to: 1 });
TransactionSchema.index({ blockchainId: 1 });
TransactionSchema.index({ timestamp: -1 });

// Add virtual fields for populated data
TransactionSchema.virtual('productDetails', {
  ref: 'Product',
  localField: 'product',
  foreignField: '_id',
  justOne: true
});

TransactionSchema.virtual('fromDetails', {
  ref: 'User',
  localField: 'from',
  foreignField: '_id',
  justOne: true
});

TransactionSchema.virtual('toDetails', {
  ref: 'User',
  localField: 'to',
  foreignField: '_id',
  justOne: true
});

// Set toJSON options to include virtuals
TransactionSchema.set('toJSON', { virtuals: true });
TransactionSchema.set('toObject', { virtuals: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema); 