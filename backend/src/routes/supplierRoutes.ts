import express from 'express';
import { 
    getSupplierStats,
    getSuppliers,
    getSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier
} from '../controllers/supplierController';
import { createProduct, getProducts } from '../controllers/productController';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../types/user';

const router = express.Router();

// Get all suppliers
router.get('/', protect, authorize(UserRole.ADMIN), getSuppliers);

// Get single supplier
router.get('/:id', protect, authorize(UserRole.ADMIN), getSupplier);

// Create new supplier
router.post('/', protect, authorize(UserRole.ADMIN), createSupplier);

// Update supplier
router.put('/:id', protect, authorize(UserRole.ADMIN), updateSupplier);

// Delete supplier
router.delete('/:id', protect, authorize(UserRole.ADMIN), deleteSupplier);

// Get supplier statistics
router.get('/stats', protect, authorize(UserRole.SUPPLIER), getSupplierStats);

// Product routes
router.post('/products', protect, authorize(UserRole.SUPPLIER), createProduct);
router.get('/products', protect, authorize(UserRole.SUPPLIER), getProducts);

export default router; 