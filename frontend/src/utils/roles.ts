// Định nghĩa các vai trò trong hệ thống
export enum UserRole {
  USER = 'user',
  SUPPLIER = 'supplier',
  ADMIN = 'admin'
}

// Định nghĩa các quyền hạn trong hệ thống
export enum Permission {
  // Quyền chung
  VIEW_PRODUCTS = 'view_products',
  VIEW_PRODUCT_DETAILS = 'view_product_details',
  SCAN_QR = 'scan_qr',
  
  // Quyền của khách hàng
  ADD_TO_CART = 'add_to_cart',
  PLACE_ORDER = 'place_order',
  VIEW_ORDER_HISTORY = 'view_order_history',
  TRACK_PRODUCT = 'track_product',
  
  // Quyền của nhà cung cấp
  CREATE_PRODUCT = 'create_product',
  UPDATE_PRODUCT = 'update_product',
  DELETE_PRODUCT = 'delete_product',
  GENERATE_QR = 'generate_qr',
  VIEW_SALES = 'view_sales',
  MANAGE_ORDERS = 'manage_orders',
  UPDATE_SUPPLY_CHAIN = 'update_supply_chain',
  
  // Quyền của admin
  MANAGE_USERS = 'manage_users',
  VERIFY_SUPPLIERS = 'verify_suppliers',
  VIEW_SYSTEM_STATS = 'view_system_stats',
  MANAGE_SYSTEM = 'manage_system',
}

// Ánh xạ vai trò với các quyền tương ứng
export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // Admin có tất cả các quyền
    ...Object.values(Permission),
  ],
  
  [UserRole.SUPPLIER]: [
    // Quyền chung
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_PRODUCT_DETAILS,
    Permission.SCAN_QR,
    
    // Quyền của nhà cung cấp
    Permission.CREATE_PRODUCT,
    Permission.UPDATE_PRODUCT,
    Permission.DELETE_PRODUCT,
    Permission.GENERATE_QR,
    Permission.VIEW_SALES,
    Permission.MANAGE_ORDERS,
    Permission.UPDATE_SUPPLY_CHAIN,
  ],
  
  [UserRole.USER]: [
    // Quyền chung
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_PRODUCT_DETAILS,
    Permission.SCAN_QR,
    
    // Quyền của khách hàng
    Permission.ADD_TO_CART,
    Permission.PLACE_ORDER,
    Permission.VIEW_ORDER_HISTORY,
    Permission.TRACK_PRODUCT,
  ],
};

// Hàm kiểm tra quyền
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  if (!role || !permission) return false;
  return rolePermissions[role]?.includes(permission) || false;
};
