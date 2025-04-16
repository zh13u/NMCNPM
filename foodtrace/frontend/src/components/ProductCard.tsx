import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  CardActionArea,
  CardActions,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  QrCodeScanner,
  VerifiedUser,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Permission } from '../utils/roles';
import PermissionGate from './PermissionGate';

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  image: string;
  origin?: string;
  supplier?: string;
  certification?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onAddToCart?: () => void;
  onScanQR?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  origin,
  supplier,
  certification,
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
  onScanQR,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        elevation={2}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <CardActionArea onClick={handleClick}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={image}
              alt={name}
              sx={{ objectFit: 'cover' }}
            />
            {certification && (
              <Chip
                icon={<VerifiedUser fontSize="small" />}
                label={certification}
                color="success"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontWeight: 'bold',
                }}
              />
            )}
          </Box>

          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              noWrap
              sx={{ fontWeight: 'bold' }}
            >
              {name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              {origin && `Xuất xứ: ${origin}`}
              {supplier && (
                <>
                  <br />
                  Nhà cung cấp: {supplier}
                </>
              )}
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 'bold', mt: 1 }}
            >
              {price.toLocaleString('vi-VN')} VNĐ
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions
          sx={{
            justifyContent: 'space-between',
            px: 2,
            pb: 2,
          }}
        >
          <Box>
            <Tooltip title="Quét mã QR">
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onScanQR) onScanQR();
                }}
              >
                <QrCodeScanner />
              </IconButton>
            </Tooltip>

            <Tooltip title={isFavorite ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}>
              <IconButton
                color={isFavorite ? "error" : "default"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onFavoriteToggle) onFavoriteToggle();
                }}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </Box>

          <PermissionGate permission={Permission.ADD_TO_CART}>
            <Tooltip title="Thêm vào giỏ hàng">
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAddToCart) onAddToCart();
                }}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                <ShoppingCart />
              </IconButton>
            </Tooltip>
          </PermissionGate>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
