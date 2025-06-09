import React, { useState } from 'react';
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  CssBaseline,
  Divider,
  Avatar,
  Paper,
} from '@mui/material';
import {
  PeopleAlt,
  Inventory2,
  Logout,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AccountManagement from './admin/AccountManagement';
import ProductManagement from './admin/ProductManagement';

const drawerWidth = 280;

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#fff',
            borderRight: '1px solid #e0e0e0',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: '#f8f9fa', 
              borderRadius: 2,
              border: '1px solid #e0e0e0'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48 }}>
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {user?.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Admin
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Divider />
        <List sx={{ px: 2 }}>
          <ListItem 
            button 
            selected={selectedTab === 0} 
            onClick={() => setSelectedTab(0)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: '#e3f2fd',
                '&:hover': {
                  bgcolor: '#e3f2fd',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedTab === 0 ? '#1976d2' : '#666' }}>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText 
              primary="Quản lý tài khoản" 
              primaryTypographyProps={{
                fontWeight: selectedTab === 0 ? 600 : 400,
                color: selectedTab === 0 ? '#1976d2' : 'inherit',
              }}
            />
          </ListItem>
          <ListItem 
            button 
            selected={selectedTab === 1} 
            onClick={() => setSelectedTab(1)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                bgcolor: '#e3f2fd',
                '&:hover': {
                  bgcolor: '#e3f2fd',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: selectedTab === 1 ? '#1976d2' : '#666' }}>
              <Inventory2 />
            </ListItemIcon>
            <ListItemText 
              primary="Tạo tài khoản" 
              primaryTypographyProps={{
                fontWeight: selectedTab === 1 ? 600 : 400,
                color: selectedTab === 1 ? '#1976d2' : 'inherit',
              }}
            />
          </ListItem>
          <Divider sx={{ my: 2 }} />
          <ListItem 
            button 
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: '#d32f2f',
              '&:hover': {
                bgcolor: '#ffebee',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#d32f2f' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText 
              primary="Đăng xuất" 
              primaryTypographyProps={{
                fontWeight: 500,
                color: '#d32f2f',
              }}
            />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#f5f5f5',
        }}
      >
        <Toolbar />
        {selectedTab === 0 && <AccountManagement />}
        {selectedTab === 1 && <ProductManagement />}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
