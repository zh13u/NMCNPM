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
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
  Popper,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Avatar,
  Chip,
  Grow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Business,
  Verified,
  Security,
  LocalShipping,
  QrCode,
  People,
  Nature,
  Info,
  FilterList,
  Close,
  EmojiEvents,
  ExpandMore,
  Phone,
  Email,
  Add,
  Edit,
  Delete,
  Visibility,
  LocationOn,
  Web,
  Timeline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`business-tabpanel-${index}`}
      aria-labelledby={`business-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const products = [
  {
    id: 1,
    name: 'Rau cải thìa hữu cơ',
    category: 'Rau củ',
    price: 35000,
    stock: 1000,
    status: 'active',
    certification: 'VietGAP',
  },
  {
    id: 2,
    name: 'Thịt bò Wagyu A5',
    category: 'Thịt',
    price: 1850000,
    stock: 50,
    status: 'active',
    certification: 'Wagyu Certificate',
  },
  {
    id: 3,
    name: 'Cá hồi tươi Na Uy',
    category: 'Hải sản',
    price: 450000,
    stock: 200,
    status: 'inactive',
    certification: 'ASC',
  },
];

const BusinessPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (product?: any) => {
    setSelectedProduct(product || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  return (
    <Box>
      {/* Business Info Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mb: 2,
                    bgcolor: 'primary.main',
                  }}
                >
                  <Business sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Nông trại hữu cơ Đà Lạt
                </Typography>
                <Chip
                  label="Đã xác thực"
                  color="success"
                  icon={<Verified />}
                  sx={{ mb: 2 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>
                      123 Đường Nguyễn Văn Linh, Đà Lạt, Lâm Đồng
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>0123 456 789</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>contact@organicfarm.com</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Web sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>www.organicfarm.com</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<Timeline />}
                      sx={{ mr: 1 }}
                    >
                      Theo dõi chuỗi cung ứng
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Security />}
                      color="secondary"
                    >
                      Quản lý chứng nhận
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Sản phẩm" />
          <Tab label="Đơn hàng" />
          <Tab label="Thống kê" />
          <Tab label="Cài đặt" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Thêm sản phẩm
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Danh mục</TableCell>
                  <TableCell align="right">Giá</TableCell>
                  <TableCell align="right">Tồn kho</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Chứng nhận</TableCell>
                  <TableCell align="right">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align="right">
                      {product.price.toLocaleString('vi-VN')} VNĐ
                    </TableCell>
                    <TableCell align="right">{product.stock}</TableCell>
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
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography>Danh sách đơn hàng sẽ được hiển thị ở đây</Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography>Thống kê sẽ được hiển thị ở đây</Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography>Cài đặt sẽ được hiển thị ở đây</Typography>
        </TabPanel>
      </Paper>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên sản phẩm"
                  defaultValue={selectedProduct?.name}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Danh mục</InputLabel>
                  <Select
                    label="Danh mục"
                    defaultValue={selectedProduct?.category}
                  >
                    <MenuItem value="Rau củ">Rau củ</MenuItem>
                    <MenuItem value="Thịt">Thịt</MenuItem>
                    <MenuItem value="Hải sản">Hải sản</MenuItem>
                    <MenuItem value="Gạo & Ngũ cốc">Gạo & Ngũ cốc</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Giá"
                  type="number"
                  defaultValue={selectedProduct?.price}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tồn kho"
                  type="number"
                  defaultValue={selectedProduct?.stock}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Chứng nhận</InputLabel>
                  <Select
                    label="Chứng nhận"
                    defaultValue={selectedProduct?.certification}
                  >
                    <MenuItem value="VietGAP">VietGAP</MenuItem>
                    <MenuItem value="Global GAP">Global GAP</MenuItem>
                    <MenuItem value="Organic">Organic</MenuItem>
                    <MenuItem value="ASC">ASC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedProduct ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusinessPage; 