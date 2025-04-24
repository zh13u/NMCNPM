export enum UserRole {
  USER = 'user',
  SUPPLIER = 'supplier',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  businessType?: string;
  address?: string;
  phone?: string;
  taxCode?: string;
  createdAt?: string;
  updatedAt?: string;
} 