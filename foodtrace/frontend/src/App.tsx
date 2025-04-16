import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserRole, Permission } from './utils/roles';
import QRScanPage from './pages/QRScanPage';
import QRGeneratorPage from './pages/QRGeneratorPage';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SupplierDashboard from './pages/SupplierDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Business from './pages/Business';
import Products from './pages/Products';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Tracking from './pages/Tracking';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

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

  // Kiểm tra đăng nhập
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra vai trò
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Chuyển hướng dựa trên vai trò của người dùng
    if (user.role === UserRole.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === UserRole.SUPPLIER) {
      return <Navigate to="/supplier/dashboard" replace />;
    } else {
      return <Navigate to="/customer/dashboard" replace />;
    }
  }

  // Kiểm tra quyền
  if (requiredPermissions.length > 0) {
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
        return <Navigate to="/customer/dashboard" replace />;
      }
    }
  }

  return <>{element}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<Layout><About /></Layout>} />

            {/* Legacy dashboard - will redirect based on role */}
            <Route path="/dashboard" element={
              <ProtectedRoute element={<Layout><Dashboard /></Layout>} />
            } />

            {/* Role-specific dashboards */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute
                element={<Layout><AdminDashboard /></Layout>}
                allowedRoles={[UserRole.ADMIN]}
                requiredPermissions={[Permission.VIEW_SYSTEM_STATS]}
              />
            } />
            <Route path="/supplier/dashboard" element={
              <ProtectedRoute
                element={<Layout><SupplierDashboard /></Layout>}
                allowedRoles={[UserRole.SUPPLIER]}
                requiredPermissions={[Permission.VIEW_SALES]}
              />
            } />
            <Route path="/customer/dashboard" element={
              <ProtectedRoute
                element={<Layout><CustomerDashboard /></Layout>}
                allowedRoles={[UserRole.CUSTOMER]}
                requiredPermissions={[Permission.VIEW_PRODUCTS]}
              />
            } />

            {/* Protected routes */}
            <Route path="/business" element={
              <ProtectedRoute element={<Layout><Business /></Layout>} />
            } />
            <Route path="/products" element={
              <ProtectedRoute element={<Layout><Products /></Layout>} />
            } />
            <Route path="/tracking" element={
              <ProtectedRoute element={<Layout><Tracking /></Layout>} />
            } />
            <Route path="/product/:id" element={
              <ProtectedRoute element={<Layout><ProductDetail /></Layout>} />
            } />
            <Route path="/profile" element={
              <ProtectedRoute element={<Profile />} />
            } />
            <Route path="/settings" element={
              <ProtectedRoute element={<Settings />} />
            } />

            {/* QR Code routes */}
            <Route path="/customer/scan" element={
              <ProtectedRoute
                element={<Layout><QRScanPage /></Layout>}
                allowedRoles={[UserRole.CUSTOMER, UserRole.SUPPLIER, UserRole.ADMIN]}
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

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;