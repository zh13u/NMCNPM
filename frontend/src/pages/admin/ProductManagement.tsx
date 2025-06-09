import React from 'react';
import { Box, Typography } from '@mui/material';

const ProductManagement: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Quản lý sản phẩm
      </Typography>
      {/* TODO: Thống kê, lọc, bảng sản phẩm, biểu đồ... */}
      <Box sx={{ p: 4, textAlign: 'center', color: 'gray' }}>
        Chức năng quản lý sản phẩm sẽ hiển thị tại đây.
      </Box>
    </Box>
  );
};

export default ProductManagement; 