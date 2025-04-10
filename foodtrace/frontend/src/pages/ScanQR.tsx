import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  Paper,
  IconButton,
} from '@mui/material';
import { QrCodeScanner, Close, Login } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ScanQR: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // TODO: Implement QR code scanning logic
    setTimeout(() => {
      setIsScanning(false);
      setShowLoginDialog(true);
    }, 2000);
  };

  const handleLogin = () => {
    setShowLoginDialog(false);
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.gradient }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Quét mã QR
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Quét mã QR trên sản phẩm để xem thông tin truy xuất nguồn gốc
            </Typography>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper
              sx={{
                p: 4,
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: 300,
                  height: 300,
                  border: `4px solid ${theme.palette.primary.main}`,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {isScanning ? (
                  <motion.div
                    animate={{
                      y: [0, 300, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      width: '100%',
                      height: 4,
                      background: theme.palette.primary.main,
                      position: 'absolute',
                    }}
                  />
                ) : (
                  <QrCodeScanner sx={{ fontSize: 100, color: theme.palette.primary.main }} />
                )}
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<QrCodeScanner />}
                onClick={handleScan}
                sx={{ mt: 4 }}
                disabled={isScanning}
              >
                {isScanning ? 'Đang quét...' : 'Bắt đầu quét'}
              </Button>
            </Paper>
          </motion.div>
        </Box>

        {/* Login Required Dialog */}
        <Dialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)}>
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography>Yêu cầu đăng nhập</Typography>
              <IconButton onClick={() => setShowLoginDialog(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Vui lòng đăng nhập để xem thông tin truy xuất nguồn gốc sản phẩm.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLoginDialog(false)}>Hủy</Button>
            <Button
              variant="contained"
              startIcon={<Login />}
              onClick={handleLogin}
            >
              Đăng nhập
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ScanQR; 