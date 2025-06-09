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
  AppBar,
  CssBaseline,
  Divider,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { PeopleAlt, Inventory2 } from '@mui/icons-material';
import AccountManagement from './admin/AccountManagement';
import ProductManagement from './admin/ProductManagement';

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #18122B 0%, #232526 100%)' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201, bgcolor: '#232526', boxShadow: 'none', borderBottom: '1px solid #333' }}>
        <Toolbar>
          <Typography variant="h5" fontWeight={800} sx={{ letterSpacing: 2, color: '#fff' }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#232526',
            color: '#fff',
            borderRight: '1px solid #333',
          },
        }}
      >
        <Toolbar />
        <Divider sx={{ bgcolor: '#333' }} />
        <List>
          <ListItem button selected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
            <ListItemIcon sx={{ color: '#fff' }}><PeopleAlt /></ListItemIcon>
            <ListItemText primary="Tài khoản" />
          </ListItem>
          <ListItem button selected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
            <ListItemIcon sx={{ color: '#fff' }}><Inventory2 /></ListItemIcon>
            <ListItemText primary="Sản phẩm" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          p: 4,
          background: 'linear-gradient(135deg, #18122B 0%, #232526 100%)',
          pl: 0,
        }}
      >
        <Toolbar />
        {/* <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Tài khoản" />
          <Tab label="Sản phẩm" />
        </Tabs> */}
        {selectedTab === 0 && <AccountManagement />}
        {selectedTab === 1 && <ProductManagement />}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
