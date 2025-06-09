import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Chip,
} from '@mui/material';
import {
  Add,
  QrCodeScanner,
  Inventory,
  VerifiedUser,
  Logout,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/user';

const SupplierDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (user?.role !== UserRole.SUPPLIER) {
    return null;
  }

  const displayName = user.company_name || user.username || 'Nhà cung cấp';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                Chào mừng, {displayName}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Trang quản lý dành cho nhà cung cấp
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                icon={<VerifiedUser />}
                label="Đang hoạt động"
                color="success"
                variant="outlined"
              />
            </Box>
          </Box>
        </Paper>

        {/* Quick Actions */}
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Thao tác nhanh
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Add Product */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
              onClick={() => navigate('/supplier/add-product')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    p: 2, 
                    borderRadius: 1,
                    mr: 2
                  }}>
                    <Add fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      Thêm sản phẩm mới
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Thêm sản phẩm và tạo mã QR
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Scan QR */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
              onClick={() => navigate('/supplier/scan')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    bgcolor: 'success.main', 
                    color: 'white', 
                    p: 2, 
                    borderRadius: 1,
                    mr: 2
                  }}>
                    <QrCodeScanner fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      Quét mã QR
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quét mã QR để xem thông tin sản phẩm
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Update Product Status */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
              onClick={() => navigate('/supplier/products')}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ 
                    bgcolor: 'warning.main', 
                    color: 'white', 
                    p: 2, 
                    borderRadius: 1,
                    mr: 2
                  }}>
                    <Inventory fontSize="large" />
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      Cập nhật trạng thái sản phẩm
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Thêm các bước, trạng thái mới cho sản phẩm theo ID
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SupplierDashboard; 