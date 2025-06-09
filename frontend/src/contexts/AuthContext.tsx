import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserRole, Permission, hasPermission } from '../utils/roles';

// Sử dụng API_URL từ config thay vì hardcode
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface User {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  role: UserRole;
  is_verified?: boolean;
  company_name?: string;
  profile_image?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
  isSupplier: () => boolean;
  isCustomer: () => boolean;
  isAdmin: () => boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  role: UserRole.USER | UserRole.SUPPLIER;
  businessName?: string;
  businessType?: string;
  address?: string;
  phone?: string;
  taxCode?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token trong localStorage khi component mount
    const token = localStorage.getItem('token');
    if (token) {
      // Gọi API để lấy thông tin user
      axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);

      // Redirect based on user role
      if (user.role === UserRole.ADMIN) {
        navigate('/admin/dashboard');
      } else if (user.role === UserRole.SUPPLIER) {
        navigate('/supplier/dashboard');
      } else if (user.role === UserRole.USER) {
        navigate('/customer/products');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
        throw new Error(errorMessage);
      }
      throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      console.log('AuthContext - Register data:', data);
      const requestData = {
        email: data.email,
        password: data.password,
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        businessName: data.businessName,
        businessType: data.businessType,
        address: data.address,
        phone: data.phone,
        taxCode: data.taxCode
      };
      console.log('AuthContext - Request data:', requestData);
      const response = await axios.post(`${API_URL}/auth/register`, requestData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
        throw new Error(errorMessage);
      }
      throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/admin');
  };

  // Hàm kiểm tra quyền của người dùng hiện tại
  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  // Hàm kiểm tra vai trò
  const isSupplier = (): boolean => user?.role === UserRole.SUPPLIER;
  const isCustomer = (): boolean => user?.role === UserRole.USER;
  const isAdmin = (): boolean => user?.role === UserRole.ADMIN;

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      hasPermission: checkPermission,
      isSupplier,
      isCustomer,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};