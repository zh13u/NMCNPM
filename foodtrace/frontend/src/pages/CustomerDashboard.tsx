import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  Paper,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  QrCodeScanner,
  ShoppingCart,
  Favorite,
  History as HistoryIcon,
  Settings,
  Person,
  Logout,
  LocalMall,
  VerifiedUser,
  Restaurant,
  Spa,
  LocalFlorist,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/roles';
import PermissionGate from '../components/PermissionGate';

const CustomerDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Mock recent products
  const recentProducts = [
    { id: 1, name: 'Rau cải hữu cơ', origin: 'Đà Lạt', date: '2 ngày trước' },
    { id: 2, name: 'Thịt bò Wagyu', origin: 'Nhật Bản', date: '1 tuần trước' },
    { id: 3, name: 'Cá hồi tươi', origin: 'Na Uy', date: '2 tuần trước' },
  ];

  // Mock featured categories
  const categories = [
    { id: 1, name: 'Rau củ hữu cơ', icon: <Spa fontSize="large" />, color: 'success' },
    { id: 2, name: 'Thịt tươi', icon: <Restaurant fontSize="large" />, color: 'error' },
    { id: 3, name: 'Hải sản', icon: <Restaurant fontSize="large" />, color: 'info' },
    { id: 4, name: 'Trái cây', icon: <LocalFlorist fontSize="large" />, color: 'warning' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Xin chào, {user?.username || 'Người dùng'}!
        </Typography>

        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Person sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">{user?.username || 'Người dùng'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Người dùng
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List>
                  <ListItem button onClick={() => navigate('/customer/favorites')}>
                    <ListItemIcon>
                      <Favorite />
                    </ListItemIcon>
                    <ListItemText primary="Sản phẩm yêu thích" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/customer/orders')}>
                    <ListItemIcon>
                      <LocalMall />
                    </ListItemIcon>
                    <ListItemText primary="Đơn hàng của tôi" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/customer/history')}>
                    <ListItemIcon>
                      <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lịch sử truy xuất" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/settings')}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Cài đặt" />
                  </ListItem>
                  <ListItem button onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary="Đăng xuất" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            {/* Search Section */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Truy xuất nguồn gốc sản phẩm
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    placeholder="Nhập mã sản phẩm hoặc tên sản phẩm..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: 'flex', gap: 1, height: '100%' }}>
                    <Button
                      variant="contained"
                      sx={{ flex: 1 }}
                      onClick={() => navigate('/customer/search')}
                    >
                      Tìm kiếm
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ flex: 1 }}
                      startIcon={<QrCodeScanner />}
                      onClick={() => navigate('/customer/scan')}
                    >
                      Quét QR
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Categories */}
            <Typography variant="h6" gutterBottom>
              Danh mục sản phẩm
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {categories.map((category) => (
                <Grid item xs={6} sm={3} key={category.id}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 2,
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}
                    onClick={() => navigate(`/customer/category/${category.id}`)}
                  >
                    <Box sx={{ color: theme.palette[category.color as 'success' | 'error' | 'info' | 'warning'].main }}>
                      {category.icon}
                    </Box>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      {category.name}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Recent Scanned Products */}
            <Typography variant="h6" gutterBottom>
              Sản phẩm đã truy xuất gần đây
            </Typography>
            <Card>
              <List>
                {recentProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    <ListItem
                      button
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <ListItemIcon>
                        <VerifiedUser color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={product.name}
                        secondary={`Xuất xứ: ${product.origin} • ${product.date}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Button
                  variant="text"
                  endIcon={<HistoryIcon />}
                  onClick={() => navigate('/customer/history')}
                >
                  Xem tất cả lịch sử
                </Button>
              </Box>
            </Card>

            {/* Quick Actions */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Thao tác nhanh
              </Typography>
              <Grid container spacing={2}>
                <PermissionGate permission={Permission.SCAN_QR}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<QrCodeScanner />}
                      onClick={() => navigate('/customer/scan')}
                    >
                      Quét mã QR
                    </Button>
                  </Grid>
                </PermissionGate>

                <PermissionGate permission={Permission.ADD_TO_CART}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<ShoppingCart />}
                      onClick={() => navigate('/customer/cart')}
                    >
                      Giỏ hàng
                    </Button>
                  </Grid>
                </PermissionGate>

                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Favorite />}
                    onClick={() => navigate('/customer/favorites')}
                  >
                    Yêu thích
                  </Button>
                </Grid>

                <PermissionGate permission={Permission.VIEW_ORDER_HISTORY}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<HistoryIcon />}
                      onClick={() => navigate('/customer/history')}
                    >
                      Lịch sử
                    </Button>
                  </Grid>
                </PermissionGate>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerDashboard;
