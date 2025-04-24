import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  useTheme,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  alpha,
  Avatar,
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
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../contexts/ThemeContext';
import ImageBanner from '../components/ImageBanner';
// import VideoPlayer from '../components/VideoPlayer'; // Temporarily disabled
import ProductCard from '../components/ProductCard';

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

const steps = [
  {
    icon: <QrCodeScanner sx={{ fontSize: 40 }} />,
    title: 'Quét mã QR',
    description: 'Quét mã QR trên sản phẩm để truy xuất thông tin',
  },
  {
    icon: <Timeline sx={{ fontSize: 40 }} />,
    title: 'Xem lịch sử',
    description: 'Theo dõi toàn bộ quá trình sản xuất và vận chuyển',
  },
  {
    icon: <Verified sx={{ fontSize: 40 }} />,
    title: 'Xác thực',
    description: 'Kiểm tra tính xác thực của sản phẩm và chứng nhận',
  },
];

// Sample images for the carousel
const carouselImages = [
  'https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
];

// Sample video URL - temporarily disabled
// const demoVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

// Sample products
const sampleProducts = [
  {
    id: 1,
    name: 'Rau cải hữu cơ',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    origin: 'Đà Lạt',
    supplier: 'Nông trại hữu cơ Đà Lạt',
    certification: 'VietGAP',
  },
  {
    id: 2,
    name: 'Thịt bò Wagyu',
    price: 750000,
    image: 'https://elmich.vn/wp-content/uploads/2024/01/bo-ap-chao-sot-tieu-den-1.jpg',
    origin: 'Nhật Bản',
    supplier: 'Công ty Thực phẩm ABC',
    certification: 'Global G.A.P',
  },
  {
    id: 3,
    name: 'Cá hồi tươi',
    price: 220000,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    origin: 'Na Uy',
    supplier: 'Công ty Hải sản XYZ',
    certification: 'ASC',
  },
  {
    id: 4,
    name: 'Trái cây hữu cơ',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    origin: 'Tiền Giang',
    supplier: 'HTX Nông nghiệp sạch',
    certification: 'Organic',
  },
];

// Sample testimonials
const testimonials = [
  {
    name: 'Nguyễn Văn A',
    role: 'Giám đốc Công ty Thực phẩm XYZ',
    content: 'Hệ thống giúp chúng tôi quản lý chuỗi cung ứng một cách hiệu quả và minh bạch. Khách hàng của chúng tôi rất hài lòng khi có thể truy xuất nguồn gốc sản phẩm.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Trần Thị B',
    role: 'Quản lý Nông trại Organic',
    content: 'Công nghệ blockchain đã giúp chúng tôi chứng minh được sản phẩm hữu cơ của mình, tăng giá trị và niềm tin của người tiêu dùng.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Lê Văn C',
    role: 'Người tiêu dùng',
    content: 'Tôi cảm thấy an tâm hơn khi biết rõ nguồn gốc thực phẩm mình sử dụng. Đây là một bước tiến lớn trong ngành thực phẩm.',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
];

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  const handleGetStarted = () => {
    navigate('/login');
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
      {/* Background decorative elements */}
      <Box sx={{
        position: 'absolute', 
        top: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: mode === 'light'
          ? 'radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0) 70%)'
          : 'radial-gradient(circle, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0) 70%)',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: mode === 'light'
          ? 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0) 70%)'
          : 'radial-gradient(circle, rgba(33, 150, 243, 0.2) 0%, rgba(33, 150, 243, 0) 70%)',
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section with Image Carousel */}
        <Box sx={{ py: { xs: 6, md: 12 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Hệ thống truy xuất nguồn gốc thực phẩm
                </Typography>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={1}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: '800px',
                    mb: 4,
                    lineHeight: 1.6
                  }}
                >
                  Sử dụng công nghệ blockchain để đảm bảo tính minh bạch và an toàn cho chuỗi cung ứng thực phẩm
                </Typography>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={2}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '50px',
                    background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                    boxShadow: '0 10px 20px rgba(76, 175, 80, 0.3)',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #43A047 0%, #1E88E5 100%)',
                      boxShadow: '0 6px 15px rgba(76, 175, 80, 0.4)',
                    }
                  }}
                  endIcon={<ArrowForward />}
                >
                  Bắt đầu ngay
                </Button>
              </motion.div>
            </Grid>

            {/* Image Carousel */}
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                custom={2}
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
        </Box>

        {/* Video Demo Section - Temporarily disabled */}

        {/* How it works section */}
        <Box sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={3}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 6,
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '25%',
                  width: '50%',
                  height: 4,
                  background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                  borderRadius: 2
                }
              }}
            >
              Cách thức hoạt động
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  custom={index + 4}
                  whileHover={{ y: -10 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '5px',
                        background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)',
                        mb: 3,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {index + 1}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {step.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {step.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products Section */}
        <Box sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={3}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 6,
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '25%',
                  width: '50%',
                  height: 4,
                  background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                  borderRadius: 2
                }
              }}
            >
              Sản phẩm nổi bật
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {sampleProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  origin={product.origin}
                  supplier={product.supplier}
                  certification={product.certification}
                  onAddToCart={() => console.log(`Add to cart: ${product.name}`)}
                  onFavoriteToggle={() => console.log(`Toggle favorite: ${product.name}`)}
                  onScanQR={() => console.log(`Scan QR: ${product.name}`)}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/products')}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                }
              }}
            >
              Xem tất cả sản phẩm
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={7}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 6,
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '25%',
                  width: '50%',
                  height: 4,
                  background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                  borderRadius: 2
                }
              }}
            >
              Tính năng nổi bật
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  custom={index + 8}
                  whileHover={{ scale: 1.03 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      overflow: 'hidden',
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '5px',
                        height: '100%',
                        background: feature.color,
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: 80,
                          height: 80,
                          borderRadius: 3,
                          background: feature.bgColor,
                          mr: 3,
                          flexShrink: 0,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ color: feature.color }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ py: 10 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={11}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 6,
                position: 'relative',
                display: 'inline-block',
                left: '50%',
                transform: 'translateX(-50%)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '25%',
                  width: '50%',
                  height: 4,
                  background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                  borderRadius: 2
                }
              }}
            >
              Khách hàng nói gì về chúng tôi
            </Typography>
          </motion.div>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  custom={index + 12}
                  whileHover={{ y: -10 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      background: mode === 'light'
                        ? 'rgba(255, 255, 255, 0.8)'
                        : 'rgba(30, 30, 30, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: mode === 'light'
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        fontSize: '4rem',
                        color: alpha(theme.palette.primary.main, 0.2),
                        fontFamily: 'Georgia, serif',
                        lineHeight: 1,
                      }
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        mt: 3,
                        pl: 2,
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                        flex: 1,
                      }}
                    >
                      {testimonial.content}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Avatar
                        src={testimonial.avatar}
                        sx={{
                          width: 56,
                          height: 56,
                          border: '2px solid',
                          borderColor: 'primary.main',
                        }}
                      />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to action */}
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={15}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 8 },
                borderRadius: 4,
                background: mode === 'light'
                  ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: mode === 'light'
                  ? 'rgba(255, 255, 255, 0.5)'
                  : 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 3
                }}
              >
                Sẵn sàng trải nghiệm?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4
                }}
              >
                Đăng ký ngay hôm nay để bắt đầu truy xuất nguồn gốc sản phẩm và tham gia vào hệ sinh thái minh bạch
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  sx={{
                    py: 1.5,
                    px: 6,
                    borderRadius: '50px',
                    background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                    boxShadow: '0 10px 20px rgba(76, 175, 80, 0.3)',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #43A047 0%, #1E88E5 100%)',
                      boxShadow: '0 6px 15px rgba(76, 175, 80, 0.4)',
                    }
                  }}
                  endIcon={<ArrowForward />}
                >
                  Đăng ký ngay
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        </Box>

        {/* Footer */}
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} FoodTrace. Hệ thống truy xuất nguồn gốc thực phẩm.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
