import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole, User } from '../types/user';
import UserModel, { IUser } from '../models/User';
import { Document, Types } from 'mongoose';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Protect routes
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    
    // Get user from database
    const user = await UserModel.findById(decoded.id).select('-password');
    
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }

    // Set user in request
    const userDoc = user as Document<Types.ObjectId> & IUser;
    req.user = {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role as UserRole,
      company: userDoc.company,
      address: userDoc.address,
      phone: userDoc.phone,
      isVerified: userDoc.isVerified,
      createdAt: userDoc.createdAt || new Date(),
      updatedAt: userDoc.updatedAt || new Date()
    };

    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ success: false, message: 'Not authorized to access this route' });
  }
};

// Grant access to specific roles
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
      return;
    }
    next();
  };
}; 