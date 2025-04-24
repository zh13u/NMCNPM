import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  QrCodeScanner,
  Close,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose?: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated QR code detection
  const [simulatedDetection, setSimulatedDetection] = useState(false);

  // Simulate QR code scanning
  React.useEffect(() => {
    if (scanning) {
      // Simulate QR code detection after 3 seconds
      const timer = setTimeout(() => {
        setSimulatedDetection(true);

        // Simulate a QR code value
        const simulatedQRValue = 'product_123456789';

        // Call the onScan callback after a short delay
        setTimeout(() => {
          onScan(simulatedQRValue);
        }, 1500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [scanning, onScan]);

  return (
    <Paper
      elevation={3}
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      sx={{
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <QrCodeScanner sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">Quét mã QR</Typography>
        </Box>
        {onClose && (
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        )}
      </Box>

      {/* Camera view (simulated) */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 350,
          bgcolor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {error ? (
          <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
        ) : (
          <>
            {/* Simulated camera view */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, #111, #333)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QrCodeScanner sx={{ fontSize: 80, color: 'rgba(255,255,255,0.2)' }} />
            </Box>

            {/* Scanning overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 200,
                height: 200,
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 2,
                boxShadow: '0 0 0 4000px rgba(0, 0, 0, 0.3)',
                zIndex: 1,
              }}
            >
              {/* Corner markers */}
              <Box sx={{ position: 'absolute', top: -2, left: -2, width: 20, height: 20, borderTop: '4px solid', borderLeft: '4px solid', borderColor: 'primary.main' }} />
              <Box sx={{ position: 'absolute', top: -2, right: -2, width: 20, height: 20, borderTop: '4px solid', borderRight: '4px solid', borderColor: 'primary.main' }} />
              <Box sx={{ position: 'absolute', bottom: -2, left: -2, width: 20, height: 20, borderBottom: '4px solid', borderLeft: '4px solid', borderColor: 'primary.main' }} />
              <Box sx={{ position: 'absolute', bottom: -2, right: -2, width: 20, height: 20, borderBottom: '4px solid', borderRight: '4px solid', borderColor: 'primary.main' }} />

              {/* Scanning animation */}
              <Box
                component={motion.div}
                initial={{ y: -100 }}
                animate={{ y: 100 }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.5,
                  ease: 'linear',
                }}
                sx={{
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  height: 2,
                  bgcolor: 'primary.main',
                  boxShadow: '0 0 8px rgba(76, 175, 80, 0.8)',
                }}
              />
            </Box>

            {/* Loading indicator for simulated detection */}
            {simulatedDetection && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  zIndex: 2,
                }}
              >
                <CircularProgress color="primary" size={60} />
                <Typography color="white" variant="h6" sx={{ mt: 2 }}>
                  Đã phát hiện mã QR
                </Typography>
                <Typography color="white" variant="body2" sx={{ mt: 1 }}>
                  Đang xử lý...
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Instructions */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          Đặt mã QR vào khung hình để quét. Giữ điện thoại cách mã QR khoảng 15-20cm.
        </Typography>
      </Box>
    </Paper>
  );
};

export default QRScanner;
