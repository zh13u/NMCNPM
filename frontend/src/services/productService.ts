import api from './api';
import { Product } from '../types/product';

export const productService = {
  async addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    const response = await api.post('/products', product);
    return response.data;
  },

  async getProduct(id: string) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getAllProducts() {
    const response = await api.get('/products');
    return response.data;
  },

  async getProductByQRCode(qrCode: string) {
    const response = await api.get(`/products/qr/${qrCode}`);
    return response.data;
  },

  async addProductToBlockchain(productData: {
    id: string;
    name: string;
    actor: string;
    location: string;
    step: string;
    qualityStatus: string;
    details: string;
  }) {
    const response = await api.post('/blockchain/products', productData);
    return response.data;
  }
}; 