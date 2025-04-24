import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  QrCode,
  Search,
  Clear,
  Visibility,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Mock data
  const products = [
    {
      id: 1,
      name: 'Gạo ST25',
      category: 'Lương thực',
      price: '150.000 VNĐ/kg',
      stock: 1000,
      status: 'active',
      certification: 'VietGAP',
      traceability: true,
    },
    {
      id: 2,
      name: 'Cà phê Arabica',
      category: 'Đồ uống',
      price: '200.000 VNĐ/kg',
      stock: 500,
      status: 'active',
      certification: 'Organic',
      traceability: true,
    },
    // Add more mock products
  ];

  const handleAddProduct = () => {
    setShowAddDialog(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowAddDialog(true);
  };

  const handleDeleteProduct = (id: number) => {
    // TODO: Implement delete logic
    console.log('Delete product:', id);
  };

  const handleViewTrace = (id: number) => {
    navigate(`/trace/${id}`);
  };

  const handleGenerateQR = (id: number) => {
    // TODO: Implement QR generation logic
    console.log('Generate QR for product:', id);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.gradient, py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bộ lọc
                </Typography>
                <TextField
                  fullWidth
                  label="Tìm kiếm"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1 }} />,
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddProduct}
                  sx={{ mb: 2 }}
                >
                  Thêm sản phẩm
                </Button>
                <Typography variant="subtitle2" gutterBottom>
                  Danh mục
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="Tất cả" color="primary" />
                  <Chip label="Lương thực" />
                  <Chip label="Đồ uống" />
                  <Chip label="Rau củ" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Card>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Danh mục</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Tồn kho</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Chứng nhận</TableCell>
                        <TableCell>Thao tác</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <Chip
                              label={product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
                              color={product.status === 'active' ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={product.certification}
                              color="primary"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleViewTrace(product.id)}>
                              <Visibility />
                            </IconButton>
                            <IconButton onClick={() => handleGenerateQR(product.id)}>
                              <QrCode />
                            </IconButton>
                            <IconButton onClick={() => handleEditProduct(product)}>
                              <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteProduct(product.id)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Add/Edit Product Dialog */}
        <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Danh mục"
                select
                variant="outlined"
                sx={{ mb: 2 }}
              >
                <MenuItem value="lương thực">Lương thực</MenuItem>
                <MenuItem value="đồ uống">Đồ uống</MenuItem>
                <MenuItem value="rau củ">Rau củ</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Giá"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Tồn kho"
                type="number"
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Chứng nhận"
                select
                variant="outlined"
                sx={{ mb: 2 }}
              >
                <MenuItem value="VietGAP">VietGAP</MenuItem>
                <MenuItem value="Organic">Organic</MenuItem>
                <MenuItem value="GlobalGAP">GlobalGAP</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAddDialog(false)}>Hủy</Button>
            <Button variant="contained" onClick={() => setShowAddDialog(false)}>
              {selectedProduct ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Products;