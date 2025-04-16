import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  QrCodeScanner,
  History as HistoryIcon,
  VerifiedUser,
  Timeline,
  LocationOn,
  CalendarToday,
  Business,
  Nature,
  LocalShipping,
  ArrowBack,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import { Permission } from '../utils/roles';
import PermissionGate from '../components/PermissionGate';

const QRScanPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock product data
  const mockProduct = {
    id: 'product_123456789',
    name: 'Rau cải hữu cơ',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    price: 35000,
    origin: 'Đà Lạt',
    supplier: 'Nông trại hữu cơ Đà Lạt',
    certification: 'VietGAP',
    description: 'Rau cải hữu cơ được trồng tại Đà Lạt, không sử dụng thuốc trừ sâu và phân bón hóa học.',
    harvestDate: '2023-05-15',
    expiryDate: '2023-05-25',
    supplyChain: [
      {
        stage: 'Trồng trọt',
        location: 'Nông trại hữu cơ Đà Lạt',
        date: '2023-04-01',
        description: 'Gieo hạt và chăm sóc cây con',
      },
      {
        stage: 'Thu hoạch',
        location: 'Nông trại hữu cơ Đà Lạt',
        date: '2023-05-15',
        description: 'Thu hoạch rau cải',
      },
      {
        stage: 'Đóng gói',
        location: 'Nhà máy đóng gói XYZ',
        date: '2023-05-16',
        description: 'Phân loại và đóng gói sản phẩm',
      },
      {
        stage: 'Vận chuyển',
        location: 'Từ Đà Lạt đến TP.HCM',
        date: '2023-05-17',
        description: 'Vận chuyển đến các cửa hàng',
      },
      {
        stage: 'Phân phối',
        location: 'Siêu thị ABC',
        date: '2023-05-18',
        description: 'Phân phối đến người tiêu dùng',
      },
    ],
  };

  const handleStartScan = () => {
    setScanning(true);
    setError(null);
  };

  const handleStopScan = () => {
    setScanning(false);
  };

  const handleScan = (data: string) => {
    setLoading(true);

    // Simulate API call to get product data
    setTimeout(() => {
      try {
        // In a real app, you would fetch product data from the backend
        // based on the QR code data
        console.log('Scanned QR code:', data);

        // For demo purposes, we'll use mock data
        setScannedProduct(mockProduct);
        setScanning(false);
        setLoading(false);
      } catch (err) {
        setError('Không thể tìm thấy thông tin sản phẩm. Vui lòng thử lại.');
        setLoading(false);
        setScanning(false);
      }
    }, 1500);
  };

  const handleBack = () => {
    if (scannedProduct) {
      setScannedProduct(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ mr: 2 }}
          >
            Quay lại
          </Button>
          <Typography variant="h4" component="h1">
            {scannedProduct ? 'Thông tin sản phẩm' : 'Quét mã QR'}
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 3 }}>
              Đang tải thông tin sản phẩm...
            </Typography>
          </Box>
        ) : error ? (
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}
          >
            <Typography color="error" variant="h6" gutterBottom>
              {error}
            </Typography>
            <Button
              variant="contained"
              startIcon={<QrCodeScanner />}
              onClick={handleStartScan}
              sx={{ mt: 2 }}
            >
              Quét lại
            </Button>
          </Paper>
        ) : scannedProduct ? (
          // Product details
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              {/* Product image and basic info */}
              <Grid item xs={12} md={5}>
                <Paper
                  elevation={3}
                  sx={{ borderRadius: 2, overflow: 'hidden' }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height={300}
                      image={scannedProduct.image}
                      alt={scannedProduct.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    {scannedProduct.certification && (
                      <Chip
                        icon={<VerifiedUser fontSize="small" />}
                        label={scannedProduct.certification}
                        color="success"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          fontWeight: 'bold',
                        }}
                      />
                    )}
                  </Box>
                  <CardContent>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                      {scannedProduct.name}
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Xuất xứ
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {scannedProduct.origin}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Nhà cung cấp
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {scannedProduct.supplier}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Ngày thu hoạch
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {scannedProduct.harvestDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Hạn sử dụng
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {scannedProduct.expiryDate}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {scannedProduct.price.toLocaleString('vi-VN')} VNĐ
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                      {scannedProduct.description}
                    </Typography>

                    <PermissionGate permission={Permission.ADD_TO_CART}>
                      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            py: 1.2,
                            borderRadius: '50px',
                            background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                          }}
                        >
                          Thêm vào giỏ hàng
                        </Button>
                      </Box>
                    </PermissionGate>
                  </CardContent>
                </Paper>
              </Grid>

              {/* Supply chain timeline */}
              <Grid item xs={12} md={7}>
                <Paper
                  elevation={3}
                  sx={{ p: 3, borderRadius: 2 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Timeline sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Chuỗi cung ứng
                    </Typography>
                  </Box>

                  <Box sx={{ position: 'relative' }}>
                    {/* Timeline line */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 20,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        bgcolor: 'divider',
                        zIndex: 0,
                      }}
                    />

                    {/* Timeline items */}
                    {scannedProduct.supplyChain.map((item: any, index: number) => (
                      <Box
                        key={index}
                        component={motion.div}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        sx={{
                          display: 'flex',
                          mb: 3,
                          position: 'relative',
                          zIndex: 1,
                        }}
                      >
                        {/* Timeline dot */}
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            mr: 2,
                            boxShadow: 2,
                          }}
                        >
                          {index === 0 ? (
                            <Nature />
                          ) : index === scannedProduct.supplyChain.length - 1 ? (
                            <LocalShipping />
                          ) : (
                            <Business />
                          )}
                        </Box>

                        {/* Timeline content */}
                        <Card
                          variant="outlined"
                          sx={{
                            flex: 1,
                            borderRadius: 2,
                            borderColor: index === 0 ? 'primary.main' : 'divider',
                            boxShadow: index === 0 ? 2 : 0,
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" fontWeight="bold">
                              {item.stage}
                            </Typography>

                            <List dense disablePadding>
                              <ListItem disablePadding sx={{ mt: 1 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <LocationOn fontSize="small" color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={item.location}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>

                              <ListItem disablePadding sx={{ mt: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <CalendarToday fontSize="small" color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={item.date}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            </List>

                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              {item.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Box>
                </Paper>

                {/* Verification info */}
                <Paper
                  elevation={3}
                  sx={{ p: 3, borderRadius: 2, mt: 3 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <VerifiedUser sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Thông tin xác thực
                    </Typography>
                  </Box>

                  <Typography variant="body2" paragraph>
                    Sản phẩm này đã được xác thực bởi hệ thống blockchain. Mọi thông tin về chuỗi cung ứng đều được lưu trữ an toàn và không thể thay đổi.
                  </Typography>

                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'success.light',
                      color: 'success.contrastText',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <VerifiedUser sx={{ mr: 1 }} />
                    <Typography variant="body2" fontWeight="medium">
                      Sản phẩm đã được xác thực và đảm bảo nguồn gốc
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        ) : scanning ? (
          <QRScanner onScan={handleScan} onClose={handleStopScan} />
        ) : (
          // Initial scan page
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <QrCodeScanner sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>

                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Quét mã QR để truy xuất nguồn gốc
                </Typography>

                <Typography variant="body1" color="text.secondary" paragraph>
                  Quét mã QR trên sản phẩm để xem thông tin chi tiết về nguồn gốc, quá trình sản xuất và chứng nhận chất lượng.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<QrCodeScanner />}
                  onClick={handleStartScan}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    px: 4,
                    borderRadius: '50px',
                    background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                    boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                  }}
                >
                  Bắt đầu quét
                </Button>

                <Divider sx={{ width: '100%', my: 4 }} />

                <Typography variant="h6" gutterBottom>
                  Lịch sử quét gần đây
                </Typography>

                <List sx={{ width: '100%' }}>
                  <ListItem
                    sx={{ borderRadius: 2, mb: 1, cursor: 'pointer' }}
                    onClick={() => setScannedProduct(mockProduct)}
                  >
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Rau cải hữu cơ"
                      secondary="Quét lúc: 10:30 AM, 20/05/2023"
                    />
                  </ListItem>
                  <ListItem
                    sx={{ borderRadius: 2, mb: 1, cursor: 'pointer' }}
                  >
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Thịt bò Wagyu"
                      secondary="Quét lúc: 3:45 PM, 18/05/2023"
                    />
                  </ListItem>
                  <ListItem
                    sx={{ borderRadius: 2, cursor: 'pointer' }}
                  >
                    <ListItemIcon>
                      <HistoryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Cá hồi tươi"
                      secondary="Quét lúc: 9:15 AM, 15/05/2023"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default QRScanPage;
