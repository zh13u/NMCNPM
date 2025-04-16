import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../utils/roles';

interface RoleGateProps {
  role: UserRole | UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component kiểm soát việc hiển thị UI dựa trên vai trò của người dùng
 * @param role - Vai trò hoặc danh sách vai trò cần kiểm tra
 * @param children - Nội dung sẽ hiển thị nếu người dùng có vai trò phù hợp
 * @param fallback - Nội dung thay thế hiển thị nếu người dùng không có vai trò phù hợp
 */
const RoleGate: React.FC<RoleGateProps> = ({
  role,
  children,
  fallback = null,
}) => {
  const { user } = useAuth();
  
  if (!user) return <>{fallback}</>;
  
  // Kiểm tra nếu role là một mảng
  if (Array.isArray(role)) {
    // Người dùng cần có một trong các vai trò được chỉ định
    const hasRole = role.includes(user.role);
    return hasRole ? <>{children}</> : <>{fallback}</>;
  }
  
  // Kiểm tra một vai trò duy nhất
  return user.role === role ? <>{children}</> : <>{fallback}</>;
};

export default RoleGate;
