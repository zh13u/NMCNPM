import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserRole, Permission, hasPermission } from '../utils/roles';

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
  username: string;
  first_name?: string;
  last_name?: string;
  role: UserRole.SUPPLIER | UserRole.CUSTOMER;
  company_name?: string;
  license_number?: string;
  address?: string;
  phone?: string;
  profile_image?: string;
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
      axios.get('http://localhost:3001/api/auth/me', {
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
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);

      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'supplier') {
        navigate('/supplier/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (error) {
      throw new Error('Đăng nhập thất bại');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      navigate('/');
    } catch (error) {
      throw new Error('Đăng ký thất bại');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // Hàm kiểm tra quyền của người dùng hiện tại
  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  // Hàm kiểm tra vai trò
  const isSupplier = (): boolean => user?.role === UserRole.SUPPLIER;
  const isCustomer = (): boolean => user?.role === UserRole.CUSTOMER;
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