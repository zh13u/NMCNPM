import { Request, Response } from 'express';
import { addProductToBlockchain, verifyProduct } from '../services/blockchainService';
import { generateQRCode } from '../services/qrCodeService';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  origin: string;
  harvestDate: string;
  expiryDate: string;
  supplierId: string;
  supplierName: string;
}

export const addProduct = async (req: Request, res: Response) => {
  try {
    const productData: Product = req.body;

    // Validate required fields
    if (!productData.name || !productData.description || !productData.category || 
        !productData.origin || !productData.harvestDate || !productData.expiryDate || 
        !productData.supplierId || !productData.supplierName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Add product to blockchain
    const result = await addProductToBlockchain(productData);

    // Generate QR code with blockchain hash
    const qrCode = await generateQRCode({
      hash: result.hash,
      productId: productData.id,
      name: productData.name
    });

    res.status(201).json({
      success: true,
      data: {
        hash: result.hash,
        qrCode,
        productId: productData.id
      }
    });
  } catch (error) {
    console.error('Error adding product:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to add product';
    res.status(500).json({
      success: false,
      error: {
        message: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      }
    });
  }
};

export const verifyProductHash = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    const result = await verifyProduct(productId);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error verifying product:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to verify product'
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    const result = await verifyProduct(productId);

    if (!result.isValid) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: result.productData
    });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get product'
    });
  }
}; 