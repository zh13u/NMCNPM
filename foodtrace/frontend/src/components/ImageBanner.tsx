import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';

interface ImageBannerProps {
  images: string[];
  title?: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  height?: string | number;
  autoPlay?: boolean;
  interval?: number;
  overlay?: boolean;
  videoUrl?: string;
}

const ImageBanner: React.FC<ImageBannerProps> = ({
  images,
  title,
  subtitle,
  actionText,
  onActionClick,
  height = 400,
  autoPlay = true,
  interval = 5000,
  overlay = true,
  videoUrl,
}) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || videoUrl) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, images.length, interval, videoUrl]);

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        height,
        overflow: 'hidden',
        borderRadius: 2,
        mb: 4,
      }}
    >
      {videoUrl ? (
        <Box
          component="video"
          autoPlay
          muted
          loop
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      ) : (
        <Box
          component={motion.div}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1s ease-in-out',
          }}
        />
      )}

      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.1) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            p: 4,
          }}
        >
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h3"
                component="h1"
                color="white"
                fontWeight="bold"
                sx={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 1,
                }}
              >
                {title}
              </Typography>
            </motion.div>
          )}

          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography
                variant="h6"
                color="white"
                sx={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  mb: 3,
                  maxWidth: '80%',
                }}
              >
                {subtitle}
              </Typography>
            </motion.div>
          )}

          {actionText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={onActionClick}
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  background: 'linear-gradient(90deg, #4CAF50 0%, #2196F3 100%)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #43A047 0%, #1E88E5 100%)',
                  },
                }}
              >
                {actionText}
              </Button>
            </motion.div>
          )}
        </Box>
      )}

      {/* Dots indicator */}
      {!videoUrl && images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              component={motion.div}
              whileHover={{ scale: 1.2 }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'primary.main' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default ImageBanner;
