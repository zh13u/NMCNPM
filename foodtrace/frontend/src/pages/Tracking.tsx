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
  MenuItem,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  StepContent
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
  Search,
  Store,
  CalendarToday,
  Person
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    label: 'Sản xuất',
    description: 'Nông trại hữu cơ Đà Lạt',
    date: '01/01/2024',
    location: 'Đà Lạt, Lâm Đồng',
    icon: <Business />,
  },
  {
    label: 'Chế biến',
    description: 'Nhà máy chế biến thực phẩm sạch',
    date: '02/01/2024',
    location: 'TP. Hồ Chí Minh',
    icon: <Store />,
  },
  {
    label: 'Vận chuyển',
    description: 'Công ty vận chuyển nhanh',
    date: '03/01/2024',
    location: 'Đang vận chuyển',
    icon: <LocalShipping />,
  },
  {
    label: 'Phân phối',
    description: 'Siêu thị thực phẩm sạch',
    date: '04/01/2024',
    location: 'Hà Nội',
    icon: <Store />,
  },
];

const Tracking: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box>
      {/* Search Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tìm kiếm sản phẩm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <QrCode />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" fullWidth>
                  Tìm kiếm
                </Button>
                <Button variant="outlined" fullWidth>
                  Quét mã QR
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Product Info */}
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
                  src="/product-image.jpg"
                  sx={{
                    width: 200,
                    height: 200,
                    mb: 2,
                  }}
                />
                <Typography variant="h5" gutterBottom>
                  Rau cải thìa hữu cơ
                </Typography>
                <Chip
                  label="VietGAP"
                  color="success"
                  icon={<Verified />}
                  sx={{ mb: 2 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  <ListItemText
                    primary="Nhà sản xuất"
                    secondary="Nông trại hữu cơ Đà Lạt"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ngày sản xuất"
                    secondary="01/01/2024"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Địa điểm sản xuất"
                    secondary="Đà Lạt, Lâm Đồng"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary="Người chịu trách nhiệm"
                    secondary="Nguyễn Văn A"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Supply Chain Steps */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Chuỗi cung ứng
        </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  <Typography variant="caption">{step.date}</Typography>
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">
                        {step.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {step.location}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          startIcon={<Edit />}
                          sx={{ mr: 1 }}
                        >
                          Chỉnh sửa
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Delete />}
                        >
                          Xóa
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Quay lại
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Paper>
    </Box>
  );
};

export default Tracking; 