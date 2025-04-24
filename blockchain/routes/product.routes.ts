import { Router, Request, Response, NextFunction } from 'express';
import { createProduct, getProductByQR } from '../controllers/product.controller';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// Middleware xác thực
const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  // Kiểm tra token từ header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    // Giải mã token và gán thông tin user vào req
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};

// Middleware kiểm tra role
const checkRole = (role: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};

const router = Router();

// Chỉ cho phép supplier tạo sản phẩm
router.post('/', authMiddleware, checkRole('supplier'), async (req: AuthRequest, res: Response): Promise<void> => {
  await createProduct(req as AuthRequest, res);
});

// API quét QR code - ai cũng có thể truy cập
router.get('/qr/:qrCode', async (req: Request, res: Response): Promise<void> => {
  await getProductByQR(req, res);
});

export default router; 