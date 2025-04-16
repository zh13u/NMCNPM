import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'supplier' | 'admin')[];
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  requireAuth = true,
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Đang load thông tin người dùng
  if (loading) {
    return <div>Đang tải...</div>;
  }

  // Kiểm tra xem route có yêu cầu đăng nhập không
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Đã đăng nhập và không cần kiểm tra role
  if (isAuthenticated && allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Kiểm tra role
  if (isAuthenticated && user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Không có quyền truy cập
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;