import { Request, Response } from 'express';
import Product from '../models/Product';
import User from '../models/User';
import { asyncHandler } from '../middleware/async';
import { ErrorResponse } from '../utils/errorResponse';
import Scan from '../models/Scan';
import Event from '../models/Event';

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private (admin)
export const getSuppliers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const suppliers = await User.find({ role: 'supplier' }).select('-password');
  res.status(200).json({
    success: true,
    count: suppliers.length,
    data: suppliers
  });
});

// @desc    Get single supplier
// @route   GET /api/suppliers/:id
// @access  Private (admin)
export const getSupplier = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const supplier = await User.findById(req.params.id).select('-password');
  
  if (!supplier) {
    throw new ErrorResponse(`Supplier not found with id of ${req.params.id}`, 404);
  }

  res.status(200).json({
    success: true,
    data: supplier
  });
});

// @desc    Create new supplier
// @route   POST /api/suppliers
// @access  Private (admin)
export const createSupplier = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const supplier = await User.create({
    ...req.body,
    role: 'supplier'
  });

  res.status(201).json({
    success: true,
    data: supplier
  });
});

// @desc    Update supplier
// @route   PUT /api/suppliers/:id
// @access  Private (admin)
export const updateSupplier = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const supplier = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  if (!supplier) {
    throw new ErrorResponse(`Supplier not found with id of ${req.params.id}`, 404);
  }

  res.status(200).json({
    success: true,
    data: supplier
  });
});

// @desc    Delete supplier
// @route   DELETE /api/suppliers/:id
// @access  Private (admin)
export const deleteSupplier = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const supplier = await User.findById(req.params.id);

  if (!supplier) {
    throw new ErrorResponse(`Supplier not found with id of ${req.params.id}`, 404);
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get supplier statistics
// @route   GET /api/supplier/stats
// @access  Private (supplier)
export const getSupplierStats = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ErrorResponse('Không tìm thấy thông tin người dùng', 401);
  }

  const supplierId = req.user.id;
  console.log('Getting stats for supplier:', supplierId);

  // Get total products
  const totalProducts = await Product.countDocuments({ supplier: supplierId });
  console.log('Total products:', totalProducts);

  // Get total scans
  const totalScans = await Scan.countDocuments({ 
    product: { $in: await Product.find({ supplier: supplierId }).select('_id') }
  });
  console.log('Total scans:', totalScans);

  // Get recent activity (last 10 events)
  const recentActivity = await Event.find({
    $or: [
      { actor: supplierId, actorRole: 'supplier' },
      { productId: { $in: await Product.find({ supplier: supplierId }).select('_id') } }
    ]
  })
  .sort({ timestamp: -1 })
  .limit(10)
  .populate('productId', 'name')
  .select('eventType timestamp details productId')
  .lean();

  console.log('Recent activity found:', recentActivity);

  // Format the activity data
  const formattedActivity = recentActivity.map(activity => ({
    ...activity,
    timestamp: new Date(activity.timestamp).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    eventType: activity.eventType === 'harvest' ? 'Thêm sản phẩm' : 'Quét mã QR'
  }));

  console.log('Formatted activity:', formattedActivity);

  res.status(200).json({
    success: true,
    data: {
      totalProducts,
      totalScans,
      recentActivity: formattedActivity
    }
  });
}); 