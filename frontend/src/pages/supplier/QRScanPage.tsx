import React, { useState, useRef, useEffect } from 'react';
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
import { Html5Qrcode } from 'html5-qrcode';

const QRScanPage: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState<any>(null);
  const [qrLink, setQrLink] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const html5QrCodeRef = useRef<any>(null);

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

  // Bắt đầu/dừng camera
  const handleCameraScan = async () => {
    setError('');
    setSelectedImage(null);
    setProduct(null);
    setQrLink('');
    setCameraActive((prev) => !prev);
  };

  useEffect(() => {
    if (cameraActive && cameraRef.current) {
      const html5QrCode = new Html5Qrcode('qr-camera');
      html5QrCodeRef.current = html5QrCode;
      html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 350 },
        (decodedText: string) => {
          html5QrCode.stop();
          setCameraActive(false);
          handleQRResult(decodedText);
        },
        (error: any) => {
          // Không hiển thị lỗi liên tục
        }
      ).catch((err: any) => {
        setError('Không thể truy cập camera hoặc camera đang được sử dụng.');
        setCameraActive(false);
      });
      return () => {
        try { html5QrCode.stop?.().catch?.(() => {}); } catch {}
        try { html5QrCode.clear?.(); } catch {}
      };
    }
  }, [cameraActive]);

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
          <Button
            variant={cameraActive ? 'outlined' : 'contained'}
            startIcon={<QrCodeScanner />}
            fullWidth
            sx={{ mb: 2 }}
            color={cameraActive ? 'error' : 'primary'}
            onClick={handleCameraScan}
          >
            {cameraActive ? 'Tắt camera' : 'Quét bằng camera'}
          </Button>
          {cameraActive && (
            <Box sx={{ width: '100%', height: 400, mb: 2 }}>
              <div id="qr-camera" ref={cameraRef} style={{ width: '100%', height: '100%' }} />
            </Box>
          )}
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
              disabled={cameraActive}
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