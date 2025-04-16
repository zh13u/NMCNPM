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
  Badge,
  IconButton,
} from '@mui/material';
import {
  Notifications,
  Business,
  LocalShipping,
  TrendingUp,
  Security,
  Add,
  Settings,
  QrCodeScanner,
  Search,
  Person,
  Logout,
  History as HistoryIcon,
  VerifiedUser,
  Inventory,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Permission } from '../utils/roles';
import PermissionGate from '../components/PermissionGate';

const SupplierDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Mock notifications data
  const notifications = [
    { id: 1, message: 'Đơn hàng mới #12345', time: '10 phút trước', read: false },
    { id: 2, message: 'Cập nhật thông tin sản phẩm', time: '30 phút trước', read: true },
    { id: 3, message: 'Yêu cầu chứng nhận mới', time: '1 giờ trước', read: true },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleMarkAsRead = (id: number) => {
    // TODO: Implement mark as read logic
    console.log('Marking notification as read:', id);
  };

  const stats = [
    { title: 'Tổng sản phẩm', value: '24', icon: <Inventory fontSize="large" />, color: 'primary' },
    { title: 'Đơn hàng', value: '12', icon: <LocalShipping fontSize="large" />, color: 'success' },
    { title: 'Doanh thu', value: '45M VNĐ', icon: <TrendingUp fontSize="large" />, color: 'warning' },
    { title: 'Chứng nhận', value: '3', icon: <VerifiedUser fontSize="large" />, color: 'info' },
  ];

  const recentActivities = [
    { id: 1, action: 'Thêm sản phẩm mới', time: '10 phút trước', icon: <Add /> },
    { id: 2, action: 'Cập nhật thông tin', time: '30 phút trước', icon: <Settings /> },
    { id: 3, action: 'Quét mã QR', time: '1 giờ trước', icon: <QrCodeScanner /> },
    { id: 4, action: 'Tìm kiếm sản phẩm', time: '2 giờ trước', icon: <Search /> },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Bảng điều khiển nhà cung cấp
        </Typography>

        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Person sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">{user?.username || 'Nhà cung cấp'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nhà cung cấp
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List>
                  <ListItem button onClick={() => navigate('/supplier/products')}>
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý sản phẩm" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/supplier/orders')}>
                    <ListItemIcon>
                      <LocalShipping />
                    </ListItemIcon>
                    <ListItemText primary="Đơn hàng" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/supplier/certifications')}>
                    <ListItemIcon>
                      <VerifiedUser />
                    </ListItemIcon>
                    <ListItemText primary="Chứng nhận" />
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
            {/* Stats */}
            <Grid container spacing={3}>
              {stats.map((stat) => (
                <Grid item xs={12} sm={6} md={3} key={stat.title}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 2, color: theme.palette[stat.color as 'primary' | 'success' | 'warning' | 'info'].main }}>
                          {stat.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" component="div">
                            {stat.title}
                          </Typography>
                          <Typography variant="h4" component="div">
                            {stat.value}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Quick Actions */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Thao tác nhanh
              </Typography>
              <Grid container spacing={2}>
                <PermissionGate permission={Permission.CREATE_PRODUCT}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => navigate('/supplier/products/new')}
                    >
                      Thêm sản phẩm
                    </Button>
                  </Grid>
                </PermissionGate>

                <PermissionGate permission={Permission.GENERATE_QR}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<QrCodeScanner />}
                      onClick={() => navigate('/supplier/qr-generator')}
                    >
                      Tạo mã QR
                    </Button>
                  </Grid>
                </PermissionGate>

                <PermissionGate permission={Permission.MANAGE_ORDERS}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<LocalShipping />}
                      onClick={() => navigate('/supplier/orders')}
                    >
                      Đơn hàng
                    </Button>
                  </Grid>
                </PermissionGate>

                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<HistoryIcon />}
                    onClick={() => navigate('/supplier/history')}
                  >
                    Lịch sử
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Notifications */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Thông báo
              </Typography>
              <Card>
                <CardContent>
                  <List>
                    {notifications.map((notification) => (
                      <React.Fragment key={notification.id}>
                        <ListItem
                          secondaryAction={
                            !notification.read && (
                              <IconButton edge="end" onClick={() => handleMarkAsRead(notification.id)}>
                                <Badge color="primary" variant="dot" />
                              </IconButton>
                            )
                          }
                        >
                          <ListItemIcon>
                            <Notifications />
                          </ListItemIcon>
                          <ListItemText
                            primary={notification.message}
                            secondary={notification.time}
                            sx={{ opacity: notification.read ? 0.7 : 1 }}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>

            {/* Recent Activities */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Hoạt động gần đây
              </Typography>
              <Card>
                <CardContent>
                  <List>
                    {recentActivities.map((activity) => (
                      <React.Fragment key={activity.id}>
                        <ListItem>
                          <ListItemIcon>{activity.icon}</ListItemIcon>
                          <ListItemText
                            primary={activity.action}
                            secondary={activity.time}
                          />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SupplierDashboard;
