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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  AdminPanelSettings,
  SupervisorAccount,
  Business,
  VerifiedUser,
  Block,
  Person,
  Logout,
  Settings,
  Dashboard,
  Security,
  PeopleAlt,
  Inventory,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Mock stats
  const stats = [
    { title: 'Tổng người dùng', value: '1,234', icon: <PeopleAlt fontSize="large" />, color: 'primary' },
    { title: 'Nhà cung cấp', value: '56', icon: <Business fontSize="large" />, color: 'success' },
    { title: 'Sản phẩm', value: '789', icon: <Inventory fontSize="large" />, color: 'warning' },
    { title: 'Chờ xác minh', value: '12', icon: <Security fontSize="large" />, color: 'error' },
  ];

  // Mock pending suppliers
  const pendingSuppliers = [
    { id: 1, name: 'Công ty TNHH ABC', email: 'abc@example.com', date: '2024-05-01' },
    { id: 2, name: 'Nông trại XYZ', email: 'xyz@example.com', date: '2024-05-02' },
    { id: 3, name: 'Cơ sở chế biến DEF', email: 'def@example.com', date: '2024-05-03' },
  ];

  // Mock recent users
  const recentUsers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'customer', status: 'active' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'supplier', status: 'pending' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'customer', status: 'active' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', role: 'supplier', status: 'active' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default, py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Bảng điều khiển quản trị
        </Typography>
        
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AdminPanelSettings sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">{user?.username || 'Admin'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quản trị viên
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <List>
                  <ListItem button onClick={() => navigate('/admin/dashboard')}>
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Tổng quan" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/admin/users')}>
                    <ListItemIcon>
                      <PeopleAlt />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý người dùng" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/admin/suppliers')}>
                    <ListItemIcon>
                      <Business />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý nhà cung cấp" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/admin/products')}>
                    <ListItemIcon>
                      <Inventory />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý sản phẩm" />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/admin/settings')}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Cài đặt hệ thống" />
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
                        <Box sx={{ mr: 2, color: theme.palette[stat.color as 'primary' | 'success' | 'warning' | 'error'].main }}>
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

            {/* Pending Verification */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Nhà cung cấp chờ xác minh
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên công ty</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Ngày đăng ký</TableCell>
                      <TableCell>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>{supplier.name}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.date}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              startIcon={<VerifiedUser />}
                            >
                              Xác minh
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<Block />}
                            >
                              Từ chối
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Recent Users */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Người dùng gần đây
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Vai trò</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.role === 'supplier' ? (
                            <Chip icon={<Business />} label="Nhà cung cấp" color="primary" size="small" />
                          ) : (
                            <Chip icon={<Person />} label="Người dùng" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          {user.status === 'active' ? (
                            <Chip label="Hoạt động" color="success" size="small" />
                          ) : (
                            <Chip label="Chờ xác minh" color="warning" size="small" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => navigate(`/admin/users/${user.id}`)}
                          >
                            Chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
