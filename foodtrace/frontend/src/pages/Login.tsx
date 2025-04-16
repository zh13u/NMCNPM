import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Apple,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [roleTab, setRoleTab] = useState<'customer' | 'supplier'>('customer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      // Trong thực tế, hàm login sẽ gọi API để xác thực
      // Ở đây chúng ta giả lập đăng nhập với vai trò được chọn
      // Trong môi trường thực tế, vai trò sẽ được xác định bởi backend

      // TODO: Thay đổi để gọi API thực tế
      await login(email, password);
      // No need to navigate here as the AuthContext will handle redirection based on user role
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (_event: React.SyntheticEvent, newValue: 'customer' | 'supplier') => {
    setRoleTab(newValue);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    // TODO: Implement Facebook login
    console.log('Facebook login');
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple login
    console.log('Apple login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0) 70%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0) 70%)',
          zIndex: 0,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            maxWidth: 450,
            width: '100%',
            borderRadius: 3,
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '5px',
              background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
            },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Đăng nhập
          </Typography>

          <Tabs
            value={roleTab}
            onChange={handleRoleChange}
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab
              value="customer"
              label="Người dùng"
              icon={<Chip label="Khách hàng" color="primary" size="small" />}
              iconPosition="end"
            />
            <Tab
              value="supplier"
              label="Doanh nghiệp"
              icon={<Chip label="Nhà cung cấp" color="secondary" size="small" />}
              iconPosition="end"
            />
          </Tabs>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: '50px',
                background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #43A047 0%, #1E88E5 100%)',
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Đăng nhập'}
            </Button>
          </form>
          <Divider sx={{ my: 3, position: 'relative' }}>
            <Typography
              variant="body2"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                px: 2,
                color: 'text.secondary',
              }}
            >
              hoặc
            </Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Google />}
              onClick={handleGoogleLogin}
              sx={{
                py: 1.2,
                borderRadius: '50px',
                borderColor: '#DB4437',
                color: '#DB4437',
                '&:hover': {
                  borderColor: '#DB4437',
                  bgcolor: 'rgba(219, 68, 55, 0.1)',
                },
              }}
            >
              Đăng nhập với Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<Facebook />}
              onClick={handleFacebookLogin}
              sx={{
                py: 1.2,
                borderRadius: '50px',
                borderColor: '#4267B2',
                color: '#4267B2',
                '&:hover': {
                  borderColor: '#4267B2',
                  bgcolor: 'rgba(66, 103, 178, 0.1)',
                },
              }}
            >
              Đăng nhập với Facebook
            </Button>
            <Button
              variant="outlined"
              startIcon={<Apple />}
              onClick={handleAppleLogin}
              sx={{
                py: 1.2,
                borderRadius: '50px',
                borderColor: '#000000',
                color: '#000000',
                '&:hover': {
                  borderColor: '#000000',
                  bgcolor: 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              Đăng nhập với Apple
            </Button>
          </Box>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Chưa có tài khoản?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/register')}
                sx={{
                  p: 0,
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'none',
                    textDecoration: 'underline',
                  },
                }}
              >
                Đăng ký ngay
              </Button>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;