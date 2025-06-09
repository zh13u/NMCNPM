import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole, Permission } from './utils/roles';
import QRScanPage from './pages/customer/QRScanPage';
import QRGeneratorPage from './pages/QRGeneratorPage';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SupplierDashboard from './pages/supplier/SupplierDashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import SupplierQRScanPage from './pages/supplier/QRScanPage';
import AddProductPage from './pages/supplier/AddProductPage';
import ProductsPage from './pages/supplier/ProductsPage';
import AdminLogin from './pages/AdminLogin';

interface ProtectedRouteProps {
  element: React.ReactNode;
  allowedRoles?: UserRole[];
  requiredPermissions?: Permission[];
}

// Protected route component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles = [],
  requiredPermissions = []
}) => {
  const { user, loading, hasPermission } = useAuth();

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  // Nếu không có vai trò yêu cầu, cho phép truy cập
  if (allowedRoles.length === 0) {
    return <>{element}</>;
  }

  // Kiểm tra đăng nhập cho các vai trò yêu cầu xác thực
  if (!user && allowedRoles.some(role => role !== UserRole.USER)) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra vai trò
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || UserRole.USER)) {
    // Chuyển hướng dựa trên vai trò của người dùng
    if (user?.role === UserRole.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === UserRole.SUPPLIER) {
      return <Navigate to="/supplier/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // Kiểm tra quyền
  if (requiredPermissions.length > 0 && user) {
    const hasAllPermissions = requiredPermissions.every(permission =>
      hasPermission(permission)
    );

    if (!hasAllPermissions) {
      // Chuyển hướng về trang chủ tương ứng với vai trò
      if (user.role === UserRole.ADMIN) {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (user.role === UserRole.SUPPLIER) {
        return <Navigate to="/supplier/dashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  return <>{element}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CssBaseline />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/scan" element={<Layout><QRScanPage /></Layout>} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute
                element={<Layout><AdminDashboard /></Layout>}
                allowedRoles={[UserRole.ADMIN]}
                requiredPermissions={[Permission.VIEW_SYSTEM_STATS]}
              />
            } />

            {/* Supplier routes */}
            <Route path="/supplier/dashboard" element={
              <ProtectedRoute
                element={<Layout><SupplierDashboard /></Layout>}
                allowedRoles={[UserRole.SUPPLIER]}
                requiredPermissions={[Permission.VIEW_SALES]}
              />
            } />
            <Route path="/supplier/add-product" element={
              <ProtectedRoute
                element={<Layout><AddProductPage /></Layout>}
                allowedRoles={[UserRole.SUPPLIER, UserRole.ADMIN]}
                requiredPermissions={[Permission.GENERATE_QR]}
              />
            } />
            <Route path="/supplier/scan" element={
              <ProtectedRoute
                element={<Layout><SupplierQRScanPage /></Layout>}
                allowedRoles={[UserRole.SUPPLIER, UserRole.ADMIN]}
                requiredPermissions={[Permission.SCAN_QR]}
              />
            } />
            <Route path="/supplier/qr-generator" element={
              <ProtectedRoute
                element={<Layout><QRGeneratorPage /></Layout>}
                allowedRoles={[UserRole.SUPPLIER, UserRole.ADMIN]}
                requiredPermissions={[Permission.GENERATE_QR]}
              />
            } />
            <Route path="/supplier/products" element={
              <ProtectedRoute
                element={<Layout><ProductsPage /></Layout>}
                allowedRoles={[UserRole.SUPPLIER, UserRole.ADMIN]}
                requiredPermissions={[Permission.VIEW_PRODUCTS]}
              />
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;