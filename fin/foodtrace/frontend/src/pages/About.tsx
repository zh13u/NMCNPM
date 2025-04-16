import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
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
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Popper,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Grow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
} from '@mui/material';
import {
  Timeline,
  Business,
  Verified,
  Security,
  LocalShipping,
  QrCode,
  People,
  Nature,
  Search,
  Clear,
  Favorite,
  Share,
  Star,
  StarBorder,
  Info,
  FilterList,
  Close,
  EmojiEvents,
  ExpandMore,
  Phone,
  Email,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Timeline sx={{ fontSize: 40 }} />,
    title: 'Truy xuất nguồn gốc',
    description: 'Theo dõi toàn bộ quá trình từ sản xuất đến tiêu thụ sản phẩm',
    details: `Hệ thống truy xuất nguồn gốc của chúng tôi cung cấp thông tin chi tiết về:

1. Thông tin sản xuất:
   - Nguồn gốc nguyên liệu
   - Quy trình sản xuất
   - Ngày sản xuất
   - Hạn sử dụng

2. Thông tin vận chuyển:
   - Điểm xuất phát
   - Điểm đến
   - Thời gian vận chuyển
   - Điều kiện bảo quản

3. Thông tin phân phối:
   - Nhà phân phối
   - Đại lý
   - Cửa hàng bán lẻ
   - Ngày nhập kho

Mọi thông tin đều được lưu trữ trên blockchain, đảm bảo tính minh bạch và không thể giả mạo. Người tiêu dùng có thể dễ dàng quét mã QR trên sản phẩm để xem toàn bộ lịch sử của sản phẩm.`,
  },
  {
    icon: <Business sx={{ fontSize: 40 }} />,
    title: 'Quản lý doanh nghiệp',
    description: 'Công cụ quản lý sản phẩm và chuỗi cung ứng cho doanh nghiệp',
    details: `Hệ thống quản lý doanh nghiệp cung cấp các tính năng:

1. Quản lý sản phẩm:
   - Thêm/sửa/xóa thông tin sản phẩm
   - Quản lý danh mục sản phẩm
   - Theo dõi số lượng tồn kho
   - Quản lý giá cả

2. Quản lý chuỗi cung ứng:
   - Theo dõi đơn hàng
   - Quản lý nhà cung cấp
   - Lập kế hoạch sản xuất
   - Quản lý kho hàng

3. Báo cáo và phân tích:
   - Báo cáo doanh thu
   - Phân tích xu hướng tiêu thụ
   - Dự báo nhu cầu
   - Đánh giá hiệu quả kinh doanh

Hệ thống giúp doanh nghiệp tối ưu hóa quy trình sản xuất và phân phối, giảm thiểu chi phí và nâng cao hiệu quả kinh doanh.`,
  },
  {
    icon: <Verified sx={{ fontSize: 40 }} />,
    title: 'Chứng nhận chất lượng',
    description: 'Xác thực và chứng nhận chất lượng sản phẩm',
    details: `Hệ thống chứng nhận chất lượng cung cấp:

1. Chứng nhận sản phẩm:
   - Chứng nhận hữu cơ
   - Chứng nhận an toàn thực phẩm
   - Chứng nhận xuất xứ
   - Chứng nhận chất lượng quốc tế

2. Quy trình xác thực:
   - Kiểm tra nguyên liệu đầu vào
   - Giám sát quá trình sản xuất
   - Kiểm tra chất lượng thành phẩm
   - Đánh giá định kỳ

3. Công cụ quản lý:
   - Lưu trữ chứng nhận
   - Theo dõi hạn sử dụng chứng nhận
   - Cập nhật thông tin chứng nhận
   - Tạo báo cáo chứng nhận

Mọi chứng nhận đều được lưu trữ trên blockchain, đảm bảo tính xác thực và không thể giả mạo.`,
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Bảo mật thông tin',
    description: 'Sử dụng blockchain để đảm bảo tính minh bạch và không thể giả mạo',
    details: `Hệ thống bảo mật của chúng tôi cung cấp:

1. Bảo mật dữ liệu:
   - Mã hóa dữ liệu đầu cuối
   - Lưu trữ phân tán trên blockchain
   - Sao lưu tự động
   - Kiểm soát truy cập

2. Tính minh bạch:
   - Lịch sử thay đổi rõ ràng
   - Không thể sửa đổi dữ liệu
   - Xác thực nguồn gốc
   - Kiểm tra tính toàn vẹn

3. Tuân thủ quy định:
   - Tuân thủ GDPR
   - Bảo vệ thông tin cá nhân
   - Kiểm toán định kỳ
   - Báo cáo bảo mật

Công nghệ blockchain giúp tạo niềm tin cho người tiêu dùng và đối tác kinh doanh.`,
  },
];

const benefits = [
  {
    icon: <People sx={{ fontSize: 40 }} />,
    title: 'Người tiêu dùng',
    description: 'Biết rõ nguồn gốc và chất lượng sản phẩm',
  },
  {
    icon: <Business sx={{ fontSize: 40 }} />,
    title: 'Doanh nghiệp',
    description: 'Nâng cao uy tín và giá trị thương hiệu',
  },
  {
    icon: <Nature sx={{ fontSize: 40 }} />,
    title: 'Môi trường',
    description: 'Thúc đẩy sản xuất và tiêu dùng bền vững',
  },
];

const caseStudies = [
  {
    title: 'Nông trại hữu cơ GreenFarm',
    description: 'Ứng dụng blockchain trong truy xuất nguồn gốc rau hữu cơ',
    image: '/images/about/case-study-1.jpg',
    results: [
      'Tăng 40% doanh số bán hàng',
      'Giảm 30% chi phí quản lý',
      'Tăng 50% niềm tin của khách hàng',
    ],
  },
  {
    title: 'Công ty thực phẩm FreshFood',
    description: 'Cải thiện chuỗi cung ứng với blockchain',
    image: '/images/about/case-study-2.jpg',
    results: [
      'Giảm 25% thời gian vận chuyển',
      'Tăng 35% hiệu quả quản lý kho',
      'Giảm 20% tổn thất sản phẩm',
    ],
  },
];

const faqs = [
  {
    question: 'Blockchain là gì và tại sao nó quan trọng trong truy xuất nguồn gốc?',
    answer: 'Blockchain là công nghệ sổ cái phân tán, cho phép lưu trữ thông tin một cách an toàn và minh bạch. Trong truy xuất nguồn gốc, blockchain giúp đảm bảo tính xác thực của thông tin và không thể bị giả mạo.',
  },
  {
    question: 'Làm thế nào để bắt đầu sử dụng hệ thống?',
    answer: 'Bạn có thể đăng ký tài khoản doanh nghiệp hoặc cá nhân trên website. Sau khi đăng ký, chúng tôi sẽ hướng dẫn bạn cách sử dụng hệ thống và tích hợp vào quy trình kinh doanh.',
  },
  {
    question: 'Chi phí sử dụng hệ thống như thế nào?',
    answer: 'Chúng tôi có nhiều gói dịch vụ phù hợp với quy mô doanh nghiệp. Liên hệ với chúng tôi để được tư vấn gói dịch vụ phù hợp nhất.',
  },
  {
    question: 'Hệ thống có hỗ trợ tích hợp với các phần mềm khác không?',
    answer: 'Có, hệ thống của chúng tôi cung cấp API để tích hợp với các phần mềm quản lý khác như ERP, CRM, và hệ thống quản lý kho.',
  },
];

const categories = [
  { id: 'all', label: 'Tất cả', icon: <FilterList /> },
  { id: 'traceability', label: 'Truy xuất nguồn gốc', icon: <Timeline /> },
  { id: 'management', label: 'Quản lý', icon: <Business /> },
  { id: 'security', label: 'Bảo mật', icon: <Security /> },
  { id: 'certification', label: 'Chứng nhận', icon: <Verified /> },
];

const About: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [showFeatureDialog, setShowFeatureDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const team = [
    {
      name: 'Nguyễn Văn A',
      position: 'CEO',
      avatar: '/images/team/ceo.jpg',
    },
    {
      name: 'Trần Thị B',
      position: 'CTO',
      avatar: '/images/team/cto.jpg',
    },
    {
      name: 'Lê Văn C',
      position: 'Blockchain Lead',
      avatar: '/images/team/blockchain.jpg',
    },
  ];

  const popularKeywords = [
    'Truy xuất nguồn gốc',
    'Quản lý sản phẩm',
    'Chứng nhận chất lượng',
    'Bảo mật blockchain',
    'Theo dõi vận chuyển',
  ];

  const allKeywords = [
    ...popularKeywords,
    ...features.map(f => f.title),
    ...features.map(f => f.description),
    'Blockchain',
    'Truy xuất nguồn gốc',
    'Chuỗi cung ứng',
    'Thực phẩm',
    'An toàn',
    'Minh bạch',
    'Bảo mật',
    'Chứng nhận',
    'Quản lý',
    'Theo dõi',
    'Vận chuyển',
    'Phân phối',
  ];

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setShowFeatureDialog(true);
  };

  const handleCloseFeatureDialog = () => {
    setShowFeatureDialog(false);
    setSelectedFeature(null);
  };

  const handleDownload = () => {
    setSnackbarMessage('Đang tải xuống tài liệu...');
    setSnackbarSeverity('info');
    setShowSnackbar(true);
    // Simulate download
    setTimeout(() => {
      setSnackbarMessage('Tải xuống thành công!');
      setSnackbarSeverity('success');
    }, 2000);
  };

  const handleShare = () => {
    setSnackbarMessage('Đã sao chép liên kết chia sẻ!');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
  };

  const handleFavorite = () => {
    setSnackbarMessage('Đã thêm vào mục yêu thích!');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    return matchesSearch && feature.title.toLowerCase().includes(selectedCategory);
  });

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.gradient }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" component="h1" gutterBottom>
              Giới thiệu về FoodTrace
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Hệ thống truy xuất nguồn gốc thực phẩm sử dụng công nghệ blockchain
            </Typography>
          </motion.div>
        </Box>

        {/* Search Section */}
        <Box sx={{ 
          position: 'relative',
          mb: 4,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          p: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm tính năng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery('')} size="small">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.4)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }
            }}
          />
          {searchQuery && (
            <Popper
              open={true}
              anchorEl={document.getElementById('search-input')}
              placement="bottom-start"
              sx={{ 
                width: '100%',
                zIndex: 1,
                mt: 1
              }}
            >
              <Paper sx={{ 
                width: '100%',
                maxHeight: 300,
                overflow: 'auto',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <ClickAwayListener onClickAway={() => setSearchQuery('')}>
                  <MenuList>
                    {filteredFeatures.map((feature) => (
                      <MenuItem 
                        key={feature.title}
                        onClick={() => {
                          setSelectedFeature(feature);
                          setShowFeatureDialog(true);
                          setSearchQuery('');
                        }}
                        sx={{
                          '&:hover': {
                            background: 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        <ListItemIcon>
                          {feature.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature.title}
                          secondary={feature.description}
                        />
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Popper>
          )}
        </Box>

        {/* Features Section with Tabs */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Tính năng nổi bật
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{ mb: 4 }}
          >
            <Tab label="Tất cả" />
            <Tab label="Phổ biến" />
            <Tab label="Mới nhất" />
          </Tabs>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {filteredFeatures.map((feature, index) => (
              <Grid item xs={12} md={6} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[8],
                      },
                      transition: 'all 0.3s ease-in-out',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    }}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <CardContent>
                      <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 1 }}
                        >
                          {feature.icon}
                        </motion.div>
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <IconButton onClick={(e) => { e.stopPropagation(); handleFavorite(); }}>
                            <Favorite />
                          </IconButton>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <IconButton onClick={(e) => { e.stopPropagation(); handleShare(); }}>
                            <Share />
                          </IconButton>
                        </motion.div>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Feature Detail Dialog with Animation */}
        <Dialog
          open={showFeatureDialog}
          onClose={handleCloseFeatureDialog}
          maxWidth="md"
          fullWidth
          TransitionComponent={Grow}
          transitionDuration={500}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5">
                {selectedFeature?.title}
              </Typography>
              <IconButton onClick={handleCloseFeatureDialog}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 1 }}
                  >
                    {selectedFeature?.icon}
                  </motion.div>
                </Box>
                <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {selectedFeature?.details}
                </Typography>
              </Box>
            </motion.div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFeatureDialog}>Đóng</Button>
          </DialogActions>
        </Dialog>

        {/* Benefits Section */}
        <Box sx={{ py: 8, background: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Lợi ích
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Box sx={{ mb: 2, color: theme.palette.primary.main }}>
                        {benefit.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {benefit.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Cách thức hoạt động
          </Typography>
          <List sx={{ mt: 4 }}>
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <Business />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Doanh nghiệp đăng ký thông tin sản phẩm"
                secondary="Thông tin về nguồn gốc, quy trình sản xuất và chứng nhận"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <QrCode />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Tạo mã QR cho sản phẩm"
                secondary="Mỗi sản phẩm được gắn một mã QR duy nhất"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <LocalShipping />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Theo dõi quá trình vận chuyển"
                secondary="Cập nhật thông tin về quá trình vận chuyển và phân phối"
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <People />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Người tiêu dùng truy xuất thông tin"
                secondary="Quét mã QR để xem thông tin chi tiết về sản phẩm"
              />
            </ListItem>
          </List>
        </Box>

        {/* Case Studies Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Case Study
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {caseStudies.map((study, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={study.image}
                      alt={study.title}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {study.title}
                      </Typography>
                      <Typography color="text.secondary" paragraph>
                        {study.description}
                      </Typography>
                      <List>
                        {study.results.map((result, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <EmojiEvents color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={result} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Video Demo Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Video Demo
          </Typography>
          <Box
            component="video"
            controls
            sx={{
              width: '100%',
              maxWidth: 800,
              borderRadius: 2,
              boxShadow: theme.shadows[4],
            }}
          >
            <source src="/videos/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Câu hỏi thường gặp
          </Typography>
          <Box sx={{ mt: 4 }}>
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Bạn đã sẵn sàng tham gia?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mt: 2 }}
          >
            Đăng ký ngay
          </Button>
        </Box>

        {/* Company Info */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h4" gutterBottom>
                Về chúng tôi
              </Typography>
              <Typography paragraph>
                FoodTrace là một startup công nghệ tập trung vào việc cải thiện tính minh bạch
                và truy xuất nguồn gốc trong chuỗi cung ứng thực phẩm. Chúng tôi tin rằng
                mọi người tiêu dùng đều có quyền biết rõ về nguồn gốc và quá trình sản xuất
                của thực phẩm họ sử dụng.
              </Typography>
              <Typography paragraph>
                Được thành lập vào năm 2023, chúng tôi đã và đang làm việc với các đối tác
                trong ngành thực phẩm để triển khai giải pháp blockchain cho việc theo dõi
                nguồn gốc sản phẩm.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thông tin liên hệ
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Business sx={{ mr: 2 }} />
                    <Typography>
                      Tầng 15, Tòa nhà Capital Tower, 109 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Phone sx={{ mr: 2 }} />
                    <Typography>+84 24 1234 5678</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ mr: 2 }} />
                    <Typography>contact@foodtrace.vn</Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Team */}
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Đội ngũ của chúng tôi
          </Typography>
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={member.avatar}
                        sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {member.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {member.position}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default About; 