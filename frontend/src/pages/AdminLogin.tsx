import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Security,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #18122B 0%, #2D3250 60%, #232526 100%)',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hiệu ứng nền */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(103,58,183,0.18) 0%, rgba(33,150,243,0) 80%)',
          filter: 'blur(2px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '8%',
          right: '8%',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,255,0.13) 0%, rgba(76,175,80,0) 80%)',
          filter: 'blur(1.5px)',
          zIndex: 0,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={16}
          sx={{
            p: 5,
            maxWidth: 420,
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 16px 64px 0 rgba(40,0,80,0.25)',
            position: 'relative',
            zIndex: 1,
            background: 'rgba(24,18,43,0.98)',
            color: '#fff',
            backdropFilter: 'blur(2px)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 64, height: 64, mb: 1, boxShadow: '0 0 16px 4px rgba(103,58,183,0.25)' }}>
              <Security sx={{ fontSize: 38, color: '#fff' }} />
            </Avatar>
            <Typography
              variant="h4"
              align="center"
              fontWeight={800}
              sx={{
                background: 'linear-gradient(90deg, #7F53AC 0%, #647DEE 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Admin Panel
            </Typography>
            <Typography variant="subtitle1" color="#bdbdbd" align="center" sx={{ mb: 1 }}>
              <span style={{ color: '#00fff7', fontWeight: 500 }}>FoodTrace</span>
            </Typography>
          </Box>
          <Divider sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.12)' }} />
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField
              fullWidth
              label="Email quản trị viên"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoFocus
              autoComplete="username"
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
              InputProps={{
                style: { color: '#fff', background: 'rgba(44,40,80,0.7)' },
              }}
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
              InputProps={{
                style: { color: '#fff', background: 'rgba(44,40,80,0.7)' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                      sx={{ color: '#bdbdbd' }}
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
              size="large"
              sx={{
                mt: 3,
                mb: 1,
                py: 1.7,
                borderRadius: '40px',
                fontWeight: 700,
                fontSize: 18,
                background: 'linear-gradient(90deg, #7F53AC 0%, #647DEE 100%)',
                boxShadow: '0 4px 24px rgba(103,58,183,0.18)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #232526 0%, #7F53AC 100%)',
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={26} /> : 'Đăng nhập'}
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AdminLogin; 