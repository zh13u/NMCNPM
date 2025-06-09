import React, { useState, useRef } from 'react';
import { BLOCKCHAIN_API } from '../../config';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  TextField
} from '@mui/material';
import { QrCodeScanner, Upload } from '@mui/icons-material';
import jsQR from 'jsqr';

const QRScanPage: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState<any>(null);
  const [qrLink, setQrLink] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Quét QR từ ảnh upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageUrl = reader.result as string;
          setSelectedImage(imageUrl);
          const image = new Image();
          image.src = imageUrl;
          image.onload = () => {
            if (canvasRef.current) {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                  handleQRResult(code.data);
                } else {
                  setError('Không thể quét mã QR từ ảnh');
                }
              }
            }
          };
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setError('Có lỗi xảy ra khi xử lý ảnh');
      }
    }
  };

  // Quét QR bằng camera (dùng thư viện html5-qrcode nếu muốn, ở đây để đơn giản sẽ bỏ qua demo camera)
  // Bạn có thể tích hợp lại nếu muốn, ở đây chỉ giữ upload ảnh cho gọn.

  // Xử lý kết quả QR (link hoặc id)
  const handleQRResult = async (qrData: string) => {
    setError('');
    setProduct(null);
    setQrLink('');
    setLoading(true);
    try {
      let productId = '';
      let productUrl = '';
      if (qrData.startsWith('http')) {
        // Nếu là link, lấy id cuối
        productUrl = qrData;
        const parts = qrData.split('/');
        productId = parts[parts.length - 1];
      } else {
        productId = qrData;
        productUrl = `${BLOCKCHAIN_API}/product/${productId}`;
      }
      setQrLink(productUrl);
      // Gọi API lấy thông tin sản phẩm
      const res = await fetch(`${BLOCKCHAIN_API}/api/getProduct/${productId}`);
      const data = await res.json();
      if (!res.ok || !data.product) throw new Error('Không tìm thấy sản phẩm');
      setProduct({
        name: data.product.name,
        origin: data.product.origin
      });
    } catch (err) {
      setError('Không thể lấy thông tin sản phẩm từ mã QR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Quét Mã QR Sản Phẩm
        </Typography>
        <Paper sx={{ p: 3, mb: 2 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-qr"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-qr">
            <Button
              variant="contained"
              component="span"
              startIcon={<Upload />}
              fullWidth
              sx={{ mb: 2 }}
            >
              Tải ảnh QR lên
            </Button>
          </label>
          {selectedImage && (
            <Box sx={{ mt: 2 }}>
              <img src={selectedImage} alt="QR Code" style={{ maxWidth: '100%', maxHeight: 200 }} />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </Box>
          )}
        </Paper>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : product ? (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Nguồn gốc:</strong> {product.origin}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => window.open(qrLink, '_blank')}
              >
                Xem thêm
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              Chưa có thông tin sản phẩm
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default QRScanPage; 