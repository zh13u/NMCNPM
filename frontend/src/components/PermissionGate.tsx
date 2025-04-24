import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/roles';

interface PermissionGateProps {
  permission: Permission | Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component kiểm soát việc hiển thị UI dựa trên quyền của người dùng
 * @param permission - Quyền hoặc danh sách quyền cần kiểm tra
 * @param children - Nội dung sẽ hiển thị nếu người dùng có quyền
 * @param fallback - Nội dung thay thế hiển thị nếu người dùng không có quyền
 */
const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  children,
  fallback = null,
}) => {
  const { hasPermission } = useAuth();
  
  // Kiểm tra nếu permission là một mảng
  if (Array.isArray(permission)) {
    // Người dùng cần có ít nhất một quyền trong danh sách
    const hasAnyPermission = permission.some(perm => hasPermission(perm));
    return hasAnyPermission ? <>{children}</> : <>{fallback}</>;
  }
  
  // Kiểm tra một quyền duy nhất
  return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGate;
