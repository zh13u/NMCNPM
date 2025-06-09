import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BLOCKCHAIN_API } from '../../config';
import { Box, Container, Typography, Paper, TextField, Button, Grid, Alert, CircularProgress, Card, CardContent } from '@mui/material';

interface ProductFormData {
  id: string;
  name: string;
  origin: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface ProductResponse {
  status: string;
  productId: string;
  name: string;
  txHash: string;
}

const AddProductPage: React.FC = () => {
  const { user } = useAuth() as { user: User | null };
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    origin: ''
  });
  const [productUrl, setProductUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<ProductResponse | null>(null);

  useEffect(() => {
    // Lấy ID sản phẩm tiếp theo từ blockchain
    const fetchNextProductId = async () => {
      try {
        const response = await fetch(`${BLOCKCHAIN_API}/api/getNextProductId`);
        const data = await response.json();
        if (data.status === 'success') {
          setFormData(prev => ({
            ...prev,
            id: data.productId
          }));
        }
      } catch (err) {
        console.error('Lỗi khi lấy ID sản phẩm:', err);
      }
    };
    fetchNextProductId();
  }, []);

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
    setProductUrl('');
    setSuccessData(null);

    try {
      // Add product to blockchain
      const response = await fetch(`${BLOCKCHAIN_API}/api/addProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          origin: formData.origin
        }),
      });

      const responseData = await response.json();
      console.log('Phản hồi từ blockchain:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Không thể thêm sản phẩm vào blockchain');
      }

      setSuccessData(responseData);

      // Ghi sản phẩm vào backend products.json
      try {
        await fetch('http://localhost:3000/api/products/local', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: formData.id,
            name: formData.name,
            origin: formData.origin,
            createdAt: new Date().toISOString(),
            steps: [],
            quality: '',
            status: 'active'
          })
        });
      } catch (err) {
        console.error('Không thể ghi vào file products.json:', err);
      }

      // Tạo URL cho trang thông tin sản phẩm
      const url = `${BLOCKCHAIN_API}/product/${formData.id}`;
      setProductUrl(url);

      // Reset form và lấy ID mới
      const nextIdResponse = await fetch(`${BLOCKCHAIN_API}/api/getNextProductId`);
      const nextIdData = await nextIdResponse.json();
      if (nextIdData.status === 'success') {
        setFormData({
          id: nextIdData.productId,
          name: '',
          origin: ''
        });
      }

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
                  label="Mã Sản Phẩm"
                  name="id"
                  value={formData.id}
                  disabled
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên Sản Phẩm"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nguồn Gốc"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  required
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

          {successData && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Thêm Sản Phẩm Thành Công!
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Mã Sản Phẩm: {successData.productId}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Tên Sản Phẩm: {successData.name}
                </Typography>
              </CardContent>
            </Card>
          )}

          {successData && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Mã QR Sản Phẩm
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img 
                  src={`${BLOCKCHAIN_API}/api/getQRCode/${successData.productId}`}
                  alt="QR Code"
                  style={{ width: 200, height: 200 }}
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.error('Lỗi khi tải ảnh QR code:', e);
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Quét mã QR để xem thông tin sản phẩm
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hoặc truy cập: <a href={`${BLOCKCHAIN_API}/product/${successData.productId}`} target="_blank" rel="noopener noreferrer">{`${BLOCKCHAIN_API}/product/${successData.productId}`}</a>
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default AddProductPage;