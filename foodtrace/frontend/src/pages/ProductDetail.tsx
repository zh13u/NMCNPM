import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardMedia,
  Rating,
  IconButton,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Share,
  LocationOn,
  Verified,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

// Mock data - sẽ được thay thế bằng API call
const product = {
  id: 1,
  name: 'Rau cải hữu cơ',
  price: 35000,
  image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655',
  origin: 'Đà Lạt',
  supplier: 'Nông trại hữu cơ Đà Lạt',
  certification: 'VietGAP',
  description: 'Rau cải hữu cơ được trồng theo phương pháp hữu cơ, không sử dụng thuốc trừ sâu và phân bón hóa học.',
  rating: 4.5,
  reviews: 128,
  blockchainInfo: {
    harvestDate: '2024-03-15',
    farmLocation: 'Đà Lạt, Lâm Đồng',
    processingDate: '2024-03-16',
    shippingDate: '2024-03-17',
    arrivalDate: '2024-03-18',
  },
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [quantity] = useState(1);

  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', { productId: id, quantity });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.reviews} đánh giá)
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" gutterBottom>
                {product.price.toLocaleString('vi-VN')} VNĐ
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  icon={<LocationOn />}
                  label={`Xuất xứ: ${product.origin}`}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<Verified />}
                  label={`Chứng nhận: ${product.certification}`}
                  color="success"
                  variant="outlined"
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{ flex: 1 }}
                >
                  Thêm vào giỏ
                </Button>
                <IconButton color="primary">
                  <Favorite />
                </IconButton>
                <IconButton color="primary">
                  <Share />
                </IconButton>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Thông tin truy xuất nguồn gốc
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Stepper orientation="vertical">
            <Step active>
              <StepLabel>
                Thu hoạch
                <Typography variant="caption" display="block">
                  {product.blockchainInfo.harvestDate}
                </Typography>
                <Typography variant="caption" display="block">
                  {product.blockchainInfo.farmLocation}
                </Typography>
              </StepLabel>
            </Step>
            <Step active>
              <StepLabel>
                Chế biến
                <Typography variant="caption" display="block">
                  {product.blockchainInfo.processingDate}
                </Typography>
              </StepLabel>
            </Step>
            <Step active>
              <StepLabel>
                Vận chuyển
                <Typography variant="caption" display="block">
                  {product.blockchainInfo.shippingDate}
                </Typography>
              </StepLabel>
            </Step>
            <Step active>
              <StepLabel>
                Đến tay người dùng
                <Typography variant="caption" display="block">
                  {product.blockchainInfo.arrivalDate}
                </Typography>
              </StepLabel>
            </Step>
          </Stepper>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetail; 