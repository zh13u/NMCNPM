import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Business,
  Timeline,
  Settings,
  Notifications,
  AccountCircle,
  ExitToApp,
  Person,
  Security,
  Info,
  Search,
  Dashboard,
  Inventory,
  ShoppingCart,
  QrCodeScanner,
  LocalShipping,
  VerifiedUser,
  AdminPanelSettings,
  PeopleAlt,
  Logout,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, Permission } from '../utils/roles';
import RoleGate from './RoleGate';
import PermissionGate from './PermissionGate';

interface LayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  permission?: Permission;
}

const drawerWidth = 240;

// Common menu items for all users
const commonMenuItems: MenuItem[] = [
  { text: 'Trang chủ', icon: <Home />, path: '/' },
  { text: 'Giới thiệu', icon: <Info />, path: '/about' },
];

// Admin-specific menu items
const adminMenuItems: MenuItem[] = [
  {
    text: 'Bảng điều khiển',
    icon: <Dashboard />,
    path: '/admin/dashboard',
    permission: Permission.VIEW_SYSTEM_STATS
  },
  {
    text: 'Quản lý người dùng',
    icon: <PeopleAlt />,
    path: '/admin/users',
    permission: Permission.MANAGE_USERS
  },
  {
    text: 'Quản lý nhà cung cấp',
    icon: <Business />,
    path: '/admin/suppliers',
    permission: Permission.VERIFY_SUPPLIERS
  },
  {
    text: 'Quản lý sản phẩm',
    icon: <Inventory />,
    path: '/admin/products',
    permission: Permission.VIEW_PRODUCTS
  },
  {
    text: 'Cài đặt hệ thống',
    icon: <Settings />,
    path: '/admin/settings',
    permission: Permission.MANAGE_SYSTEM
  },
];

// Supplier-specific menu items
const supplierMenuItems: MenuItem[] = [
  {
    text: 'Bảng điều khiển',
    icon: <Dashboard />,
    path: '/supplier/dashboard',
    permission: Permission.VIEW_SALES
  },
  {
    text: 'Quản lý sản phẩm',
    icon: <Inventory />,
    path: '/supplier/products',
    permission: Permission.CREATE_PRODUCT
  },
  {
    text: 'Đơn hàng',
    icon: <LocalShipping />,
    path: '/supplier/orders',
    permission: Permission.MANAGE_ORDERS
  },
  {
    text: 'Chứng nhận',
    icon: <VerifiedUser />,
    path: '/supplier/certifications',
    permission: Permission.VIEW_PRODUCT_DETAILS
  },
  {
    text: 'Tạo mã QR',
    icon: <QrCodeScanner />,
    path: '/supplier/qr-generator',
    permission: Permission.GENERATE_QR
  },
];

// Customer-specific menu items
const customerMenuItems: MenuItem[] = [
  {
    text: 'Bảng điều khiển',
    icon: <Dashboard />,
    path: '/customer/dashboard',
    permission: Permission.VIEW_PRODUCTS
  },
  {
    text: 'Truy xuất',
    icon: <Timeline />,
    path: '/tracking',
    permission: Permission.TRACK_PRODUCT
  },
  {
    text: 'Quét mã QR',
    icon: <QrCodeScanner />,
    path: '/customer/scan',
    permission: Permission.SCAN_QR
  },
  {
    text: 'Giỏ hàng',
    icon: <ShoppingCart />,
    path: '/customer/cart',
    permission: Permission.ADD_TO_CART
  },
  {
    text: 'Lịch sử',
    icon: <Timeline />,
    path: '/customer/history',
    permission: Permission.VIEW_ORDER_HISTORY
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  // Determine which menu items to show based on user role
  const getMenuItemsForRole = (): MenuItem[] => {
    if (!user) return commonMenuItems;

    switch (user.role) {
      case UserRole.ADMIN:
        return [...commonMenuItems, ...adminMenuItems];
      case UserRole.SUPPLIER:
        return [...commonMenuItems, ...supplierMenuItems];
      case UserRole.CUSTOMER:
        return [...commonMenuItems, ...customerMenuItems];
      default:
        return commonMenuItems;
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            mr: 2,
          }}
        >
          FT
        </Avatar>
        <Typography variant="h6" noWrap>
          FoodTrace
        </Typography>
      </Box>
      {user && (
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {user.role === 'admin' ? 'Quản trị viên' :
             user.role === 'supplier' ? 'Nhà cung cấp' : 'Người dùng'}
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {user.username}
          </Typography>
        </Box>
      )}
      <Divider />
      <List>
        {getMenuItemsForRole().map((item) => (
          // Nếu item có quyền, kiểm tra quyền trước khi hiển thị
          item.permission ? (
            <PermissionGate key={item.text} permission={item.permission}>
              <ListItem
                button
                onClick={() => handleMenuClick(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </PermissionGate>
          ) : (
            // Nếu item không có quyền, hiển thị bình thường
            <ListItem
              button
              key={item.text}
              onClick={() => handleMenuClick(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'primary.contrastText' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          )
        ))}
      </List>
      {user && (
        <>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          {/* Search Button */}
          <Tooltip title="Tìm kiếm">
            <IconButton
              color="inherit"
              sx={{
                mr: 1,
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' },
              }}
              onClick={() => navigate('/')}
            >
              <Search />
            </IconButton>
          </Tooltip>

          {/* Theme Toggle */}
          <Box sx={{ mr: 1 }}>
            <ThemeToggle />
          </Box>

          <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Hồ sơ" />
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cài đặt" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        onClick={handleNotificationMenuClose}
        PaperProps={{
          sx: { width: 320 },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <Business fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Đơn hàng mới"
            secondary="Bạn có đơn hàng mới từ khách hàng A"
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Security fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Chứng nhận sắp hết hạn"
            secondary="Chứng nhận VietGAP sẽ hết hạn trong 30 ngày"
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Timeline fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Cập nhật trạng thái"
            secondary="Đơn hàng #123 đã được giao thành công"
          />
        </MenuItem>
      </Menu>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Layout;