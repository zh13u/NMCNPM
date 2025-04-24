import { Request, Response } from 'express';
import Product from '../models/Product';
import Event from '../models/Event';
import { asyncHandler } from '../middleware/async';
import { ErrorResponse } from '../utils/errorResponse';

// @desc    Create new product
// @route   POST /api/supplier/products
// @access  Private (supplier)
export const createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ErrorResponse('Không tìm thấy thông tin người dùng', 401);
  }

  console.log('Creating product with data:', req.body);
  console.log('User ID:', req.user.id);

  const productData = {
    ...req.body,
    supplier: req.user.id
  };

  // Create product
  const product = await Product.create(productData);
  console.log('Product created:', product);

  // Create event for the new product
  const eventData = {
    productId: product._id,
    eventType: 'harvest',
    timestamp: new Date(),
    location: productData.origin,
    actor: req.user.id,
    actorRole: 'supplier',
    details: `Đã thêm sản phẩm mới: ${productData.name}`,
    blockchainId: product.blockchainId || 'pending',
    status: 'confirmed'
  };

  console.log('Creating event with data:', eventData);
  const event = await Event.create(eventData);
  console.log('Event created:', event);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Get all products for a supplier
// @route   GET /api/supplier/products
// @access  Private (supplier)
export const getProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ErrorResponse('Không tìm thấy thông tin người dùng', 401);
  }

  const products = await Product.find({ supplier: req.user.id });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
}); 