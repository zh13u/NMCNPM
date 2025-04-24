import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BLOCKCHAIN_API } from '../../config';
import { Box, Container, Typography, Paper, TextField, Button, Grid, Alert, CircularProgress } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';

interface ProductFormData {
  productName: string;
  actor: string;
  location: string;
  step: string;
  qualityStatus: string;
  details: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AddProductPage: React.FC = () => {
  const { user } = useAuth() as { user: User | null };
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>({
    productName: '',
    actor: user?.name || '',
    location: '',
    step: 'Sản xuất',
    qualityStatus: 'Tốt',
    details: ''
  });
  const [qrCode, setQrCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQrCode('');

    try {
      // Generate a unique product ID
      const productId = `SP${Date.now().toString().slice(-5).padStart(5, '0')}`;

      // Prepare product data for blockchain
      const productData = {
        productId: productId,
        productName: formData.productName,
        actor: formData.actor,
        location: formData.location,
        step: formData.step,
        qualityStatus: formData.qualityStatus,
        details: formData.details
      };

      console.log('Đang gửi dữ liệu đến blockchain:', {
        url: `${BLOCKCHAIN_API}/api/addEvent`,
        data: productData
      });

      // Add product to blockchain
      const response = await fetch(`${BLOCKCHAIN_API}/api/addEvent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const responseData = await response.json();
      console.log('Phản hồi từ blockchain:', responseData);

      if (!response.ok) {
        console.error('Lỗi từ blockchain:', responseData);
        const errorMessage = responseData.error?.message || responseData.error || 'Không thể thêm sản phẩm vào blockchain';
        throw new Error(errorMessage);
      }

      // Generate QR code with product URL
      if (!responseData.productUrl) {
        throw new Error('Không tìm thấy URL sản phẩm');
      }
      setQrCode(responseData.productUrl);
      console.log('Mã QR đã được tạo:', responseData.productUrl);

      // Reset form
      setFormData({
        productName: '',
        actor: user?.name || '',
        location: '',
        step: 'Sản xuất',
        qualityStatus: 'Tốt',
        details: ''
      });

    } catch (err) {
      console.error('Chi tiết lỗi:', err);
      const errorMessage = err instanceof Error ? err.message : 'Không thể thêm sản phẩm';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Thêm Sản Phẩm Mới
        </Typography>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên Sản Phẩm"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Người Thực Hiện"
                  name="actor"
                  value={formData.actor}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Địa Điểm"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bước"
                  name="step"
                  value={formData.step}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tình Trạng Chất Lượng"
                  name="qualityStatus"
                  value={formData.qualityStatus}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Chi Tiết"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Thêm Sản Phẩm'}
                </Button>
              </Grid>
            </Grid>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {qrCode && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Mã QR Sản Phẩm
              </Typography>
              <QRCodeSVG value={qrCode} size={200} />
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default AddProductPage;