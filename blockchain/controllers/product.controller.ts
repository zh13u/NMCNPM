import { Request, Response } from 'express';
import { Product } from '../../src/models/product.model';
import QRCode from 'qrcode';
import { ethers } from 'ethers';
import { ProductContract } from '../contracts/ProductContract';
import { ProductData, BlockchainProduct } from '../contracts/types';

// Khởi tạo provider và contract
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_URL || 'http://localhost:8545');

// Tạo wallet từ private key (cần thêm private key vào env)
const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY || '';
const wallet = new ethers.Wallet(privateKey, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS || '',
  ProductContract.abi,
  wallet
);

// Định nghĩa interface cho Request có user
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const {
      name,
      description,
      price,
      quantity,
      productionDate,
      expiryDate,
      batchNumber
    } = req.body;

    // Lấy supplierId từ user đã đăng nhập
    const supplierId = req.user.id;

    // Tạo ID sản phẩm duy nhất
    const productId = `PRD${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    // Tạo dữ liệu sản phẩm cho blockchain
    const productData = {
      id: productId,
      name,
      description,
      productionDate,
      expiryDate,
      batchNumber,
      supplierId,
      timestamp: new Date().toISOString()
    };

    // Lưu dữ liệu lên blockchain
    const tx = await contract.addProduct(
      productId,
      name,
      description,
      productionDate,
      expiryDate,
      batchNumber,
      supplierId
    );
    await tx.wait();

    // Tạo mã QR với dữ liệu sản phẩm và hash blockchain
    const qrData = JSON.stringify({
      productId,
      blockchainTx: tx.hash,
      ...productData
    });

    const qrCode = await QRCode.toDataURL(qrData);

    // Lưu sản phẩm vào database
    const product = new Product({
      productId,
      name,
      description,
      price,
      quantity,
      productionDate,
      expiryDate,
      batchNumber,
      supplierId,
      qrCode,
      blockchainTx: tx.hash
    });

    await product.save();

    res.status(201).json({
      success: true,
      data: {
        product,
        qrCode
      }
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message
    });
  }
};

export const getProductByQR = async (req: Request, res: Response) => {
  try {
    const { qrCode } = req.params;
    
    // Giải mã QR code để lấy productId
    const qrData = JSON.parse(qrCode);
    const { productId, blockchainTx } = qrData;

    // Lấy thông tin sản phẩm từ database
    const product = await Product.findOne({ productId })
      .populate('supplierId', 'name businessName');
      
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }

    // Xác thực dữ liệu trên blockchain
    const blockchainData = await contract.getProduct(productId);
    
    // Kiểm tra tính toàn vẹn của dữ liệu
    const isValid = product.blockchainTx === blockchainTx;

    res.status(200).json({
      success: true,
      data: {
        product,
        blockchainData,
        isValid
      }
    });
  } catch (error: any) {
    console.error('Error getting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting product',
      error: error.message
    });
  }
}; 