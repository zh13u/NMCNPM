export enum UserRole {
  ADMIN = 'admin',
  SUPPLIER = 'supplier',
  DISTRIBUTOR = 'distributor',
  RETAILER = 'retailer',
  CUSTOMER = 'customer'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  address?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
} 