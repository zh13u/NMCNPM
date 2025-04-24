import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
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
  Grid,
  TextField
} from '@mui/material';
import { QrCodeScanner, Upload, Search } from '@mui/icons-material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import jsQR from 'jsqr';

interface Product {
  productId: string;
  productName: string;
  actor: string;
  location: string;
  step: string;
  qualityStatus: string;
  details: string;
  timestamp: string;
}

const CustomerQRScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [manualInput, setManualInput] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const cameraScannerRef = useRef<Html5QrcodeScanner | null>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (scanning && cameraRef.current) {
      // Xóa scanner cũ nếu tồn tại
      if (cameraScannerRef.current) {
        cameraScannerRef.current.clear();
      }

      // Tạo scanner mới
      const qrScanner = new Html5QrcodeScanner(
        "camera-reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true
        },
        false
      );

      qrScanner.render(
        async (decodedText: string) => {
          try {
            console.log('Mã QR đã quét được:', decodedText);
            setScanning(false);
            await fetchProductDetails(decodedText);
          } catch (err) {
            console.error('Lỗi khi xử lý mã QR:', err);
            setError('Không thể xử lý mã QR. Vui lòng thử lại.');
          }
        },
        (error: string) => {
          console.error('Lỗi khi quét mã QR:', error);
          setError('Lỗi khi quét mã QR. Vui lòng thử lại.');
        }
      );

      cameraScannerRef.current = qrScanner;

      return () => {
        if (qrScanner) {
          qrScanner.clear();
        }
      };
    }
  }, [scanning]);

  const handleScanToggle = () => {
    if (scanning) {
      // Dừng quét
      if (cameraScannerRef.current) {
        cameraScannerRef.current.clear();
      }
      setScanning(false);
    } else {
      // Bắt đầu quét
      setScanning(true);
    }
  };

  const extractProductName = (input: string): string | null => {
    try {
      // Nếu là URL, trích xuất tên sản phẩm từ path
      if (input.startsWith('http')) {
        const url = new URL(input);
        const pathParts = url.pathname.split('/');
        // Tìm phần tử chứa tên sản phẩm (thường là phần tử cuối cùng)
        return pathParts[pathParts.length - 1];
      }
      // Nếu không phải URL, coi như là tên sản phẩm trực tiếp
      return input;
    } catch (err) {
      console.error('Lỗi khi trích xuất tên sản phẩm:', err);
      return null;
    }
  };

  const parseProductFromHTML = (html: string) => {
    try {
      // Tạo một DOM parser để parse HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Lấy thông tin từ các thẻ p
      const getTextContent = (label: string) => {
        const element = Array.from(doc.querySelectorAll('p')).find(p => 
          p.textContent?.includes(label)
        );
        return element?.textContent?.split(':')[1]?.trim() || '';
      };

      return {
        productId: doc.querySelector('h2')?.textContent?.split(':')[1]?.trim() || '',
        productName: getTextContent('Tên sản phẩm'),
        actor: getTextContent('Nhà sản xuất'),
        location: getTextContent('Location'),
        step: getTextContent('Bước'),
        qualityStatus: getTextContent('Chất lượng'),
        details: getTextContent('Chi tiết'),
        timestamp: getTextContent('Thời gian')
      };
    } catch (err) {
      console.error('Lỗi khi parse HTML:', err);
      return null;
    }
  };

  const fetchProductDetails = async (input: string) => {
    try {
      setLoading(true);
      setError('');
      setProduct(null);

      // Trích xuất tên sản phẩm từ input
      const productName = extractProductName(input);
      if (!productName) {
        throw new Error('Không thể trích xuất tên sản phẩm từ mã QR');
      }

      console.log('Đang tìm kiếm sản phẩm với tên:', productName);
      const response = await fetch(`${BLOCKCHAIN_API}/product/name/${productName}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      // Lấy nội dung response
      const responseText = await response.text();
      console.log('Response:', responseText);

      // Kiểm tra content type
      const contentType = response.headers.get('content-type');
      let productData;

      if (contentType?.includes('application/json')) {
        // Nếu là JSON
        productData = JSON.parse(responseText);
      } else if (contentType?.includes('text/html')) {
        // Nếu là HTML
        productData = parseProductFromHTML(responseText);
        if (!productData) {
          throw new Error('Không thể đọc thông tin sản phẩm từ trang web');
        }
      } else {
        throw new Error('Server trả về định dạng không hỗ trợ');
      }

      // Kiểm tra các trường bắt buộc
      if (!productData.productName || !productData.actor || !productData.location) {
        throw new Error('Thông tin sản phẩm không đầy đủ');
      }

      setProduct({
        productId: productData.productId || productName,
        productName: productData.productName,
        actor: productData.actor,
        location: productData.location,
        step: productData.step || 'Không xác định',
        qualityStatus: productData.qualityStatus || 'Không xác định',
        details: productData.details || '',
        timestamp: productData.timestamp || new Date().toISOString()
      });
    } catch (err) {
      console.error('Lỗi khi tải thông tin sản phẩm:', err);
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch')) {
          setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và thử lại.');
        } else if (err.message.includes('Unexpected token')) {
          setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Có lỗi xảy ra khi tải thông tin sản phẩm');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageUrl = reader.result as string;
          setSelectedImage(imageUrl);

          // Tạo một hình ảnh mới
          const image = new Image();
          image.src = imageUrl;

          image.onload = () => {
            if (canvasRef.current) {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');
              
              if (ctx) {
                // Vẽ ảnh lên canvas
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);

                // Lấy dữ liệu pixel từ canvas
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                // Quét QR code
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                
                if (code) {
                  fetchProductDetails(code.data);
                } else {
                  setError('Không thể quét mã QR từ ảnh');
                }
              }
            }
          };
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error('Lỗi khi xử lý ảnh:', err);
        setError('Có lỗi xảy ra khi xử lý ảnh');
      }
    }
  };

  const handleManualSearch = async () => {
    if (manualInput.trim()) {
      await fetchProductDetails(manualInput);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Quét Mã QR Sản Phẩm
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tùy chọn quét
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<QrCodeScanner />}
                  onClick={handleScanToggle}
                  fullWidth
                  sx={{ mb: 2 }}
                  color={scanning ? 'error' : 'primary'}
                >
                  {scanning ? 'Dừng quét' : 'Bật camera quét'}
                </Button>

                {scanning && (
                  <Box sx={{ 
                    width: '100%', 
                    height: 300, 
                    position: 'relative',
                    border: '2px solid #ccc',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}>
                    <div id="camera-reader" ref={cameraRef} style={{ width: '100%', height: '100%' }}></div>
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
                    variant="outlined"
                    component="span"
                    startIcon={<Upload />}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Tải ảnh QR lên
                  </Button>
                </label>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Nhập tên sản phẩm"
                    value={manualInput}
                    onChange={(e) => setManualInput(e.target.value)}
                    placeholder="Ví dụ: nhincc"
                  />
                  <Button
                    variant="contained"
                    startIcon={<Search />}
                    onClick={handleManualSearch}
                  >
                    Tìm
                  </Button>
                </Box>
              </Box>

              {selectedImage && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Ảnh đã chọn:
                  </Typography>
                  <img
                    src={selectedImage}
                    alt="QR Code"
                    style={{ maxWidth: '100%', maxHeight: 200 }}
                  />
                  <canvas ref={canvasRef} style={{ display: 'none' }} />
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            ) : product ? (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.productName}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>ID:</strong> {product.productId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Địa điểm:</strong> {product.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Bước:</strong> {product.step}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Tình trạng:</strong> {product.qualityStatus}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Người thực hiện:</strong> {product.actor}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/customer/product/${product.productId}`)}
                  >
                    Xem chi tiết
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CustomerQRScanPage; 