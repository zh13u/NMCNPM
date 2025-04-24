import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Edit,
  Email,
  Phone,
  LocationOn,
  Business,
  Save,
  Cancel,
  Verified,
  History,
  QrCode,
  Security,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận XYZ, TP.HCM',
    company: 'Công ty TNHH ABC',
    role: 'Quản lý',
    avatar: '/images/avatar.jpg',
    joinDate: '01/01/2023',
    verified: true,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setOpenDialog(false);
  };

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.gradient, py: 4 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4}>
            {/* Thông tin cá nhân */}
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', background: 'rgba(255, 255, 255, 0.9)' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
                    <Avatar
                      src={userData.avatar}
                      sx={{ width: 150, height: 150, mb: 2 }}
                    />
                    {userData.verified && (
                      <Verified
                        sx={{
                          position: 'absolute',
                          bottom: 20,
                          right: 0,
                          color: theme.palette.success.main,
                          bgcolor: 'white',
                          borderRadius: '50%',
                          p: 0.5,
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {userData.name}
                  </Typography>
                  <Chip
                    label={userData.role}
                    color="primary"
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEdit}
                    sx={{ mb: 2 }}
                  >
                    Chỉnh sửa hồ sơ
                  </Button>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText primary="Email" secondary={userData.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText primary="Điện thoại" secondary={userData.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn />
                      </ListItemIcon>
                      <ListItemText primary="Địa chỉ" secondary={userData.address} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Business />
                      </ListItemIcon>
                      <ListItemText primary="Công ty" secondary={userData.company} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Thống kê và hoạt động */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                {/* Thống kê */}
                <Grid item xs={12}>
                  <Card sx={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Thống kê
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="primary">
                              150
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Sản phẩm
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="primary">
                              50
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Đơn hàng
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="primary">
                              30
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Đối tác
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Hoạt động gần đây */}
                <Grid item xs={12}>
                  <Card sx={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Hoạt động gần đây
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <QrCode />
                          </ListItemIcon>
                          <ListItemText
                            primary="Đã tạo mã QR cho sản phẩm mới"
                            secondary="2 giờ trước"
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <History />
                          </ListItemIcon>
                          <ListItemText
                            primary="Đã cập nhật thông tin truy xuất nguồn gốc"
                            secondary="5 giờ trước"
                          />
                        </ListItem>
                        <Divider />
                        <ListItem>
                          <ListItemIcon>
                            <Security />
                          </ListItemIcon>
                          <ListItemText
                            primary="Đã xác thực chứng nhận chất lượng"
                            secondary="1 ngày trước"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>

        {/* Dialog chỉnh sửa */}
        <Dialog open={isEditing} onClose={handleCancel} maxWidth="sm" fullWidth>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={userData.name}
                onChange={handleChange('name')}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={userData.email}
                onChange={handleChange('email')}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Điện thoại"
                value={userData.phone}
                onChange={handleChange('phone')}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Địa chỉ"
                value={userData.address}
                onChange={handleChange('address')}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Công ty"
                value={userData.company}
                onChange={handleChange('company')}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} startIcon={<Cancel />}>
              Hủy
            </Button>
            <Button onClick={handleSave} variant="contained" startIcon={<Save />}>
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Profile; 