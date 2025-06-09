import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
  MenuItem,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

const businessTypes = [
  'Nông sản',
  'Thực phẩm',
  'Đồ uống',
  'Khác',
];

const SupplierAccountCreation: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    businessName: '',
    businessType: '',
    customBusinessType: '',
    address: '',
    phone: '',
    taxCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBusinessTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, businessType: e.target.value, customBusinessType: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    // Validate
    const businessTypeToSend = formData.businessType === 'Khác' ? formData.customBusinessType : formData.businessType;
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.businessName || !businessTypeToSend || !formData.address || !formData.phone || !formData.taxCode) {
      setError('Vui lòng điền đầy đủ thông tin!');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('/api/auth/register', {
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'supplier',
        businessName: formData.businessName,
        businessType: businessTypeToSend,
        address: formData.address,
        phone: formData.phone,
        taxCode: formData.taxCode,
      });
      if (response.data && response.data.success) {
        setSuccess('Tạo tài khoản supplier thành công!');
        setFormData({
          firstName: '', lastName: '', email: '', password: '', businessName: '', businessType: '', customBusinessType: '', address: '', phone: '', taxCode: ''
        });
      } else {
        setError('Tạo tài khoản thất bại!');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tạo tài khoản!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, minWidth: 400, maxWidth: 520, bgcolor: 'background.paper', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <PersonAddAlt1Icon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h5" fontWeight={800} mb={1} color="primary">
            Tạo tài khoản Supplier
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Nhập đầy đủ thông tin doanh nghiệp để tạo tài khoản nhà cung cấp mới
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1 }} />, sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mật khẩu"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên doanh nghiệp"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                InputProps={{ startAdornment: <BusinessIcon sx={{ mr: 1 }} />, sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Loại hình doanh nghiệp"
                name="businessType"
                value={formData.businessType}
                onChange={handleBusinessTypeChange}
                required
                InputProps={{ sx: { borderRadius: 2 } }}
              >
                {businessTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>
            {formData.businessType === 'Khác' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nhập loại hình doanh nghiệp khác"
                  name="customBusinessType"
                  value={formData.customBusinessType}
                  onChange={handleChange}
                  required
                  InputProps={{ sx: { borderRadius: 2 } }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                InputProps={{ startAdornment: <LocationOnIcon sx={{ mr: 1 }} />, sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                InputProps={{ startAdornment: <PhoneIcon sx={{ mr: 1 }} />, sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã số thuế"
                name="taxCode"
                value={formData.taxCode}
                onChange={handleChange}
                required
                InputProps={{ sx: { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 2, fontWeight: 700, fontSize: 18, py: 1.5 }}
                disabled={loading}
              >
                {loading ? 'Đang tạo...' : 'Tạo tài khoản'}
              </Button>
            </Grid>
          </Grid>
        </form>
        {success && <Alert severity="success" sx={{ mt: 3 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default SupplierAccountCreation; 