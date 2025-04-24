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
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Business,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../utils/roles';

const steps = [
  'Chọn loại tài khoản',
  'Thông tin cá nhân',
  'Thông tin doanh nghiệp',
  'Xác nhận',
];

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    role: 'user',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
    address: '',
    phone: '',
    taxCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.role) {
        setError('Vui lòng chọn loại tài khoản');
        return;
      }
    } else if (activeStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Vui lòng điền đầy đủ thông tin');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Mật khẩu không khớp');
        return;
      }
    } else if (activeStep === 2 && formData.role === 'supplier') {
      if (!formData.businessName || !formData.businessType || !formData.address || !formData.phone || !formData.taxCode) {
        setError('Vui lòng điền đầy đủ thông tin doanh nghiệp');
        return;
      }
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Selected role:', formData.role);
      const registerData = {
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: (formData.role === 'user' ? UserRole.USER : UserRole.SUPPLIER) as UserRole.USER | UserRole.SUPPLIER,
        businessName: formData.businessName,
        businessType: formData.businessType,
        address: formData.address,
        phone: formData.phone,
        taxCode: formData.taxCode
      };
      console.log('Register data:', registerData);
      await register(registerData);
      navigate('/login');
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Chọn loại tài khoản bạn muốn đăng ký
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant={formData.role === 'user' ? 'contained' : 'outlined'}
                onClick={() => setFormData({ ...formData, role: 'user' })}
                sx={{ py: 2 }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Person sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6">Người dùng</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đăng ký để mua sắm và theo dõi sản phẩm
                  </Typography>
                </Box>
              </Button>
              <Button
                fullWidth
                variant={formData.role === 'supplier' ? 'contained' : 'outlined'}
                onClick={() => setFormData({ ...formData, role: 'supplier' })}
                sx={{ py: 2 }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Business sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6">Doanh nghiệp</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đăng ký để bán và quản lý sản phẩm
                  </Typography>
                </Box>
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Họ"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Tên"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </Box>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
            <TextField
              fullWidth
              label="Xác nhận mật khẩu"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </Box>
        );
      case 2:
        return formData.role === 'supplier' ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Tên doanh nghiệp"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Loại hình doanh nghiệp"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Địa chỉ"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Số điện thoại"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Mã số thuế"
              value={formData.taxCode}
              onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
              required
            />
          </Box>
        ) : null;
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Thông tin cá nhân</Typography>
            <Typography>Họ và tên: {formData.firstName} {formData.lastName}</Typography>
            <Typography>Email: {formData.email}</Typography>
            <Typography>Loại tài khoản: {formData.role === 'user' ? 'Người dùng' : 'Doanh nghiệp'}</Typography>
            {formData.role === 'supplier' && (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>Thông tin doanh nghiệp</Typography>
                <Typography>Tên doanh nghiệp: {formData.businessName}</Typography>
                <Typography>Loại hình: {formData.businessType}</Typography>
                <Typography>Địa chỉ: {formData.address}</Typography>
                <Typography>Số điện thoại: {formData.phone}</Typography>
                <Typography>Mã số thuế: {formData.taxCode}</Typography>
              </>
            )}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 600,
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Đăng ký tài khoản
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Quay lại
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Hoàn thành'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Tiếp theo
                </Button>
              )}
            </Box>
          </form>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Đã có tài khoản?{' '}
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ p: 0 }}
              >
                Đăng nhập ngay
              </Button>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Register; 