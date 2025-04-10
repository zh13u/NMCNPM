import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Switch,
  Button,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  Notifications,
  Language,
  Palette,
  Backup,
  Delete,
  Save,
  NotificationsActive,
  Brightness4,
  Brightness7,
  Email,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    pushNotifications: true,
    language: 'vi',
    theme: 'light',
    autoBackup: true,
    backupFrequency: 'daily',
    deleteDataAfter: '30',
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [field]: event.target.checked });
  };

  const handleSelectChange = (field: string) => (event: SelectChangeEvent) => {
    setSettings({ ...settings, [field]: event.target.value });
  };

  const handleSave = () => {
    setSnackbarMessage('Đã lưu cài đặt thành công');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
  };

  const handleReset = () => {
    setSettings({
      notifications: true,
      emailNotifications: true,
      pushNotifications: true,
      language: 'vi',
      theme: 'light',
      autoBackup: true,
      backupFrequency: 'daily',
      deleteDataAfter: '30',
    });
    setSnackbarMessage('Đã đặt lại cài đặt mặc định');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.gradient, py: 4 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: 4, color: 'white' }}>
            Cài đặt
          </Typography>

          <Grid container spacing={3}>
            {/* Thông báo */}
            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Notifications sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Thông báo
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <NotificationsActive />
                      </ListItemIcon>
                      <ListItemText primary="Bật thông báo" />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={settings.notifications}
                          onChange={handleChange('notifications')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText primary="Thông báo qua email" />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={settings.emailNotifications}
                          onChange={handleChange('emailNotifications')}
                          disabled={!settings.notifications}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Notifications />
                      </ListItemIcon>
                      <ListItemText primary="Thông báo đẩy" />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={settings.pushNotifications}
                          onChange={handleChange('pushNotifications')}
                          disabled={!settings.notifications}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Ngôn ngữ và giao diện */}
            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Language sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Ngôn ngữ và giao diện
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Language />
                      </ListItemIcon>
                      <FormControl fullWidth>
                        <InputLabel>Ngôn ngữ</InputLabel>
                        <Select
                          value={settings.language}
                          onChange={handleSelectChange('language')}
                          label="Ngôn ngữ"
                        >
                          <MenuItem value="vi">Tiếng Việt</MenuItem>
                          <MenuItem value="en">English</MenuItem>
                        </Select>
                      </FormControl>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Palette />
                      </ListItemIcon>
                      <FormControl fullWidth>
                        <InputLabel>Giao diện</InputLabel>
                        <Select
                          value={settings.theme}
                          onChange={handleSelectChange('theme')}
                          label="Giao diện"
                        >
                          <MenuItem value="light">
                            <Brightness7 sx={{ mr: 1 }} />
                            Sáng
                          </MenuItem>
                          <MenuItem value="dark">
                            <Brightness4 sx={{ mr: 1 }} />
                            Tối
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Sao lưu và bảo mật */}
            <Grid item xs={12} md={6}>
              <Card sx={{ background: 'rgba(255, 255, 255, 0.9)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Backup sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Sao lưu và bảo mật
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Backup />
                      </ListItemIcon>
                      <ListItemText primary="Tự động sao lưu" />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={settings.autoBackup}
                          onChange={handleChange('autoBackup')}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {settings.autoBackup && (
                      <ListItem>
                        <ListItemIcon>
                          <Backup />
                        </ListItemIcon>
                        <FormControl fullWidth>
                          <InputLabel>Tần suất sao lưu</InputLabel>
                          <Select
                            value={settings.backupFrequency}
                            onChange={handleSelectChange('backupFrequency')}
                            label="Tần suất sao lưu"
                          >
                            <MenuItem value="daily">Hàng ngày</MenuItem>
                            <MenuItem value="weekly">Hàng tuần</MenuItem>
                            <MenuItem value="monthly">Hàng tháng</MenuItem>
                          </Select>
                        </FormControl>
                      </ListItem>
                    )}
                    <ListItem>
                      <ListItemIcon>
                        <Delete />
                      </ListItemIcon>
                      <FormControl fullWidth>
                        <InputLabel>Xóa dữ liệu sau</InputLabel>
                        <Select
                          value={settings.deleteDataAfter}
                          onChange={handleSelectChange('deleteDataAfter')}
                          label="Xóa dữ liệu sau"
                        >
                          <MenuItem value="30">30 ngày</MenuItem>
                          <MenuItem value="60">60 ngày</MenuItem>
                          <MenuItem value="90">90 ngày</MenuItem>
                          <MenuItem value="never">Không bao giờ</MenuItem>
                        </Select>
                      </FormControl>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Nút điều khiển */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Delete />}
                  onClick={handleReset}
                >
                  Đặt lại mặc định
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Lưu cài đặt
                </Button>
              </Box>
            </Grid>
          </Grid>
        </motion.div>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Settings; 