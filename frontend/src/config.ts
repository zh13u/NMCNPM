// Cấu hình API và các endpoint
export const API_URL = 'http://localhost:3001';
export const BLOCKCHAIN_API = 'http://192.168.1.11:5000';

// Cấu hình app
export const APP_NAME = 'Food Traceability';
export const APP_DESCRIPTION = 'Theo dõi nguồn gốc thực phẩm bằng blockchain';

// Vai trò người dùng
export const ROLES = {
  ADMIN: 'admin',
  SUPPLIER: 'supplier',
  CUSTOMER: 'customer'
};

// Các đường dẫn
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SUPPLIER_DASHBOARD: '/supplier/dashboard',
  ADD_PRODUCT: '/supplier/add-product',
  SCAN_QR: '/scan',
  VERIFY: '/verify'
};