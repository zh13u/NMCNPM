import mongoose from 'mongoose';

export interface IScan extends mongoose.Document {
  product: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  scanDate: Date;
  location: string;
  verificationResult: {
    isValid: boolean;
    details: string;
  };
}

const ScanSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scanDate: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: [true, 'Please provide the scan location'],
    trim: true
  },
  verificationResult: {
    isValid: {
      type: Boolean,
      required: true
    },
    details: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

// Add index for faster queries
ScanSchema.index({ product: 1, user: 1 });
ScanSchema.index({ scanDate: -1 });

export default mongoose.model<IScan>('Scan', ScanSchema); 