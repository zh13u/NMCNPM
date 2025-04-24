import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Favorite,
  Visibility,
  QrCode,
  Search,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BLOCKCHAIN_API } from '../config';

interface Product {
  productId: string;
  productName: string;
  actor: string;
  location: string;
  step: string;
  qualityStatus: string;
  details: string;
  timestamp: string;
}

const CustomerDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BLOCKCHAIN_API}/api/getAllProducts`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Không thể tải danh sách sản phẩm');
      }

      // Lấy chi tiết cho từng sản phẩm
      const productsWithDetails = await Promise.all(
        data.products.map(async (product: { productId: string }) => {
          const eventsResponse = await fetch(`${BLOCKCHAIN_API}/api/getEvents/${product.productId}`);
          const eventsData = await eventsResponse.json();
          
          if (eventsData.events && eventsData.events.length > 0) {
            const latestEvent = eventsData.events[eventsData.events.length - 1];
            return {
              ...product,
              ...latestEvent
            };
          }
          return product;
        })
      );

      setProducts(productsWithDetails);
    } catch (err) {
      console.error('Lỗi khi tải sản phẩm:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'tốt':
        return 'success';
      case 'đang xử lý':
        return 'warning';
      case 'lỗi':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleGenerateQR = (productId: string) => {
    // TODO: Implement QR generation
    console.log('Generate QR for product:', productId);
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bộ lọc
                </Typography>
                <TextField
                  fullWidth
                  label="Tìm kiếm"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1 }} />,
                  }}
                />
                <Typography variant="subtitle2" gutterBottom>
                  Trạng thái
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="Tất cả" color="primary" />
                  <Chip label="Tốt" />
                  <Chip label="Đang xử lý" />
                  <Chip label="Lỗi" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.productId}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {product.productName}
                      </Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Chip 
                          label={product.qualityStatus}
                          color={getStatusColor(product.qualityStatus) as any}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Chip 
                          label={product.step}
                          variant="outlined"
                          size="small"
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>ID:</strong> {product.productId}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Địa điểm:</strong> {product.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Người thực hiện:</strong> {product.actor}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {filteredProducts.length === 0 && (
              <Paper sx={{ p: 3, textAlign: 'center', mt: 3 }}>
                <Typography variant="body1" color="text.secondary">
                  Chưa có sản phẩm nào được thêm vào hệ thống.
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerDashboard;
