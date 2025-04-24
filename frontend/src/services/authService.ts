import api from './api';
import { User } from '../types/user';

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(userData: {
    email: string;
    password: string;
    name: string;
    firstName?: string;
    lastName?: string;
    role: User['role'];
    businessName?: string;
    businessType?: string;
    address?: string;
    phone?: string;
    taxCode?: string;
  }) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  }
}; 