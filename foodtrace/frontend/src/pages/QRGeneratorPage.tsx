import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  useTheme,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';
import {
  QrCode,
  Download,
  Print,
  Share,
  ArrowBack,
  Add,
  Delete,
  Save,
  ContentCopy,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Permission } from '../utils/roles';
import PermissionGate from '../components/PermissionGate';

// Mock QR code image
const mockQRCode = 'data:image/png;base64,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';

const QRGeneratorPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [origin, setOrigin] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mock product list
  const products = [
    { id: 'prod_001', name: 'Rau cải hữu cơ', type: 'Rau củ', origin: 'Đà Lạt' },
    { id: 'prod_002', name: 'Thịt bò Wagyu', type: 'Thịt', origin: 'Nhật Bản' },
    { id: 'prod_003', name: 'Cá hồi tươi', type: 'Hải sản', origin: 'Na Uy' },
    { id: 'prod_004', name: 'Trái cây hữu cơ', type: 'Trái cây', origin: 'Tiền Giang' },
  ];

  const handleProductChange = (event: SelectChangeEvent) => {
    const selectedId = event.target.value;
    setProductId(selectedId);

    if (selectedId) {
      const product = products.find(p => p.id === selectedId);
      if (product) {
        setProductName(product.name);
        setProductType(product.type);
        setOrigin(product.origin);
      }
    } else {
      setProductName('');
      setProductType('');
      setOrigin('');
    }
  };

  const handleGenerateQR = () => {
    if (!productId || !productName || !harvestDate || !expiryDate) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setError(null);

    // In a real app, you would call an API to generate a QR code
    // For demo purposes, we'll use a mock QR code
    setGeneratedQR(mockQRCode);
  };

  const handleDownload = () => {
    if (!generatedQR) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = generatedQR;
    link.download = `qr-${productId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (!generatedQR) return;

    // Simplified print function
    alert('Chức năng in mã QR sẽ được triển khai sau');
  };

  const handleCopyLink = () => {
    if (!productId) return;

    // Simplified copy function
    alert('Đã sao chép liên kết sản phẩm!');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            Quay lại
          </Button>
          <Typography variant="h4" component="h1">
            Tạo mã QR cho sản phẩm
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Form section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Thông tin sản phẩm
              </Typography>

              {error && (
                <Box sx={{ mb: 2 }}>
                  <FormHelperText error>{error}</FormHelperText>
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="product-select-label">Chọn sản phẩm</InputLabel>
                    <Select
                      labelId="product-select-label"
                      value={productId}
                      label="Chọn sản phẩm"
                      onChange={handleProductChange}
                    >
                      <MenuItem value="">
                        <em>Chọn sản phẩm</em>
                      </MenuItem>
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tên sản phẩm"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    disabled={!!productId}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Loại sản phẩm"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    disabled={!!productId}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Xuất xứ"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    disabled={!!productId}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ngày thu hoạch"
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hạn sử dụng"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mô tả sản phẩm"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setProductId('');
                    setProductName('');
                    setProductType('');
                    setOrigin('');
                    setHarvestDate('');
                    setExpiryDate('');
                    setDescription('');
                    setGeneratedQR(null);
                    setError(null);
                  }}
                  startIcon={<Delete />}
                >
                  Xóa
                </Button>

                <PermissionGate permission={Permission.GENERATE_QR}>
                  <Button
                    variant="contained"
                    onClick={handleGenerateQR}
                    startIcon={<QrCode />}
                    sx={{
                      py: 1,
                      px: 3,
                      borderRadius: '50px',
                      background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                    }}
                  >
                    Tạo mã QR
                  </Button>
                </PermissionGate>
              </Box>
            </Paper>
          </Grid>

          {/* QR code display section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                p: 3,
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Mã QR
              </Typography>

              {generatedQR ? (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box
                    component="img"
                    src={generatedQR}
                    alt="QR Code"
                    sx={{
                      width: 200,
                      height: 200,
                      mb: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      p: 2,
                      borderRadius: 2,
                    }}
                  />

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {productName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    ID: {productId}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Tooltip title="Tải xuống">
                      <IconButton
                        color="primary"
                        onClick={handleDownload}
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="In">
                      <IconButton
                        color="primary"
                        onClick={handlePrint}
                      >
                        <Print />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Sao chép liên kết">
                      <IconButton
                        color="primary"
                        onClick={handleCopyLink}
                      >
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px dashed',
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <QrCode sx={{ fontSize: 80, color: 'text.disabled' }} />
                  </Box>

                  <Typography variant="body1" color="text.secondary" align="center">
                    Điền thông tin sản phẩm và nhấn "Tạo mã QR" để tạo mã QR cho sản phẩm của bạn.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Recent QR codes section */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              sx={{
                p: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Mã QR đã tạo gần đây
              </Typography>

              <Grid container spacing={2}>
                {products.slice(0, 3).map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        borderRadius: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 100, p: 1 }}
                        image={mockQRCode}
                        alt={`QR Code for ${product.name}`}
                      />
                      <CardContent sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {product.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tạo lúc: {new Date().toLocaleDateString()}
                        </Typography>
                        <Box sx={{ display: 'flex', mt: 1 }}>
                          <Tooltip title="Tải xuống">
                            <IconButton size="small">
                              <Download fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="In">
                            <IconButton size="small">
                              <Print fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default QRGeneratorPage;
