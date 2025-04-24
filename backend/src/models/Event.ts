import mongoose from 'mongoose';

export interface IEvent extends mongoose.Document {
  productId: string;
  eventType: 'harvest' | 'process' | 'package' | 'transport' | 'store' | 'sell';
  timestamp: Date;
  location: string;
  actor: string;
  actorRole: 'supplier' | 'distributor' | 'retailer';
  details: string;
  blockchainId: string;
  status: 'pending' | 'confirmed' | 'rejected';
}

const EventSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product ID']
  },
  eventType: {
    type: String,
    enum: ['harvest', 'process', 'package', 'transport', 'store', 'sell'],
    required: [true, 'Please provide an event type']
  },
  timestamp: {
    type: Date,
    required: [true, 'Please provide a timestamp'],
    default: Date.now
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true
  },
  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide an actor']
  },
  actorRole: {
    type: String,
    enum: ['supplier', 'distributor', 'retailer'],
    required: [true, 'Please provide an actor role']
  },
  details: {
    type: String,
    required: [true, 'Please provide event details'],
    trim: true
  },
  blockchainId: {
    type: String,
    required: [true, 'Please provide a blockchain ID'],
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Add indexes for faster queries
EventSchema.index({ productId: 1 });
EventSchema.index({ eventType: 1 });
EventSchema.index({ actor: 1 });
EventSchema.index({ timestamp: 1 });
EventSchema.index({ blockchainId: 1 });
EventSchema.index({ status: 1 });

export default mongoose.model<IEvent>('Event', EventSchema); 