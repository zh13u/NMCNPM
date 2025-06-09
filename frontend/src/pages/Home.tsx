import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  useTheme,
  Paper,
  Divider,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Timeline,
  Business,
  Security,
  Verified,
  ArrowForward,
  QrCodeScanner,
  Search,
  CheckCircle,
  Storage,
  Speed,
  Lock,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../contexts/ThemeContext';
import ImageBanner from '../components/ImageBanner';

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

const features = [
  {
    icon: <Timeline sx={{ fontSize: 50, color: '#4CAF50' }} />,
    title: 'Truy xuất nguồn gốc',
    description: 'Theo dõi toàn bộ quá trình từ sản xuất đến tiêu thụ sản phẩm',
    color: '#4CAF50',
    bgColor: 'rgba(76, 175, 80, 0.1)',
  },
  {
    icon: <Business sx={{ fontSize: 50, color: '#2196F3' }} />,
    title: 'Quản lý doanh nghiệp',
    description: 'Công cụ quản lý sản phẩm và chuỗi cung ứng cho doanh nghiệp',
    color: '#2196F3',
    bgColor: 'rgba(33, 150, 243, 0.1)',
  },
  {
    icon: <Verified sx={{ fontSize: 50, color: '#FF9800' }} />,
    title: 'Chứng nhận chất lượng',
    description: 'Xác thực và chứng nhận chất lượng sản phẩm',
    color: '#FF9800',
    bgColor: 'rgba(255, 152, 0, 0.1)',
  },
  {
    icon: <Security sx={{ fontSize: 50, color: '#9C27B0' }} />,
    title: 'Bảo mật thông tin',
    description: 'Sử dụng blockchain để đảm bảo tính minh bạch và không thể giả mạo',
    color: '#9C27B0',
    bgColor: 'rgba(156, 39, 176, 0.1)',
  },
];

const howToUse = [
  {
    title: 'Đối với người tiêu dùng',
    steps: [
      {
        icon: <QrCodeScanner />,
        text: 'Quét mã QR trên sản phẩm để xem thông tin chi tiết'
      },
      {
        icon: <Timeline />,
        text: 'Xem lịch sử sản xuất và vận chuyển của sản phẩm'
      },
      {
        icon: <Verified />,
        text: 'Kiểm tra chứng nhận và xác thực chất lượng'
      }
    ]
  },
  {
    title: 'Đối với doanh nghiệp',
    steps: [
      {
        icon: <Business />,
        text: 'Đăng ký tài khoản doanh nghiệp'
      },
      {
        icon: <QrCodeScanner />,
        text: 'Tạo và quản lý mã QR cho sản phẩm'
      },
      {
        icon: <Timeline />,
        text: 'Cập nhật thông tin sản phẩm trong chuỗi cung ứng'
      }
    ]
  }
];

const benefits = [
  {
    icon: <Storage />,
    title: 'Dữ liệu minh bạch',
    description: 'Mọi thông tin được lưu trữ trên blockchain, đảm bảo tính minh bạch và không thể thay đổi'
  },
  {
    icon: <Speed />,
    title: 'Truy xuất nhanh chóng',
    description: 'Chỉ cần quét mã QR để xem toàn bộ thông tin sản phẩm trong vài giây'
  },
  {
    icon: <Lock />,
    title: 'Bảo mật cao',
    description: 'Sử dụng công nghệ blockchain để bảo vệ thông tin và chống giả mạo'
  }
];

const carouselImages = [
  'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
];

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  const handleScanQR = () => {
    navigate('/scan');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: mode === 'light'
        ? 'linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%)'
        : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={0}
            >
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? '#1a1a2e' : '#ffffff',
                }}
              >
                Hệ thống Truy xuất Nguồn gốc Thực phẩm
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                Sử dụng công nghệ Blockchain để đảm bảo tính minh bạch và đáng tin cậy trong chuỗi cung ứng thực phẩm
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleScanQR}
                startIcon={<QrCodeScanner />}
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': {
                    bgcolor: '#388E3C',
                  },
                }}
              >
                Quét mã QR
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={1}
            >
              <ImageBanner
                images={carouselImages}
                height={400}
                autoPlay={true}
                interval={5000}
                overlay={false}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Tính năng chính
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={index}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    bgcolor: feature.bgColor,
                    borderRadius: 2,
                  }}
                >
                  {feature.icon}
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How to Use Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Cách sử dụng
        </Typography>
        <Grid container spacing={4}>
          {howToUse[0].steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={index}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {step.text}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Lợi ích
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={index}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>
                      {benefit.title}
                    </Typography>
                    <Typography color="text.secondary" align="center">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
        >
          <Typography variant="h4" gutterBottom>
            Sẵn sàng truy xuất nguồn gốc?
          </Typography>
          <Typography color="text.secondary" paragraph>
            Quét mã QR trên sản phẩm để xem thông tin chi tiết
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleScanQR}
            startIcon={<QrCodeScanner />}
            sx={{
              bgcolor: '#4CAF50',
              '&:hover': {
                bgcolor: '#388E3C',
              },
            }}
          >
            Quét mã QR
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
