import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Autocomplete,
  Link,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  Timeline,
  Business,
  Verified,
  TrendingUp,
  Security,
  LocalShipping,
  EmojiEvents,
  Restaurant,
  Close,
  Search,
  Send,
  Person,
  Email,
  Phone,
  Message,
  Login,
  HowToReg,
  AccountCircle,
  ExitToApp,
  Google,
  Facebook,
  Apple,
  History,
  Delete,
  Visibility,
  VisibilityOff,
  LockReset,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Timeline sx={{ fontSize: 40 }} />,
    title: 'Truy xuất nguồn gốc',
    description: 'Theo dõi toàn bộ quá trình sản xuất và phân phối sản phẩm',
    color: 'primary',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    icon: <Business sx={{ fontSize: 40 }} />,
    title: 'Quản lý doanh nghiệp',
    description: 'Công cụ quản lý doanh nghiệp hiệu quả và minh bạch',
    color: 'secondary',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    icon: <Verified sx={{ fontSize: 40 }} />,
    title: 'Chứng nhận chất lượng',
    description: 'Xác thực và chứng nhận chất lượng sản phẩm',
    color: 'success',
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Bảo mật thông tin',
    description: 'Bảo vệ thông tin bằng công nghệ blockchain',
    color: 'info',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

const stats = [
  {
    icon: <Business sx={{ fontSize: 40 }} />,
    title: 'Doanh nghiệp',
    value: '1000+',
    color: {
      light: 'custom.blue.light',
      main: 'custom.blue.main',
    },
  },
  {
    icon: <Restaurant sx={{ fontSize: 40 }} />,
    title: 'Sản phẩm',
    value: '5000+',
    color: {
      light: 'custom.green.light',
      main: 'custom.green.main',
    },
  },
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: 'Giao dịch',
    value: '10000+',
    color: {
      light: 'custom.orange.light',
      main: 'custom.orange.main',
    },
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 40 }} />,
    title: 'Chứng nhận',
    value: '2000+',
    color: {
      light: 'custom.purple.light',
      main: 'custom.purple.main',
    },
  },
];

const searchOptions = [
  { label: 'Sản phẩm hữu cơ', category: 'product' },
  { label: 'Doanh nghiệp nông nghiệp', category: 'business' },
  { label: 'Chứng nhận chất lượng', category: 'certification' },
  { label: 'Quy trình sản xuất', category: 'process' },
];

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [showFeatureDialog, setShowFeatureDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
    setShowFeatureDialog(true);
  };

  const handleCloseDialog = () => {
    setShowFeatureDialog(false);
    setSelectedFeature(null);
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    setShowContactDialog(false);
    setSnackbarMessage('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleLogin = () => {
    // TODO: Implement login logic
    setShowLoginDialog(false);
    setSnackbarMessage('Đăng nhập thành công!');
    setSnackbarSeverity('success');
    setShowSnackbar(true);
  };

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearchValue(value);
      setSearchHistory((prev) => [value, ...prev.filter((item) => item !== value)].slice(0, 10));
      navigate(`/search?q=${value}`);
    }
  };

  const handleClearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleRemoveFromHistory = (item: string) => {
    setSearchHistory((prev) => prev.filter((i) => i !== item));
  };

  const handleSocialLogin = (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    // TODO: Implement social login logic
    setTimeout(() => {
      setIsLoading(false);
      setShowLoginDialog(false);
      setSnackbarMessage(`Đăng nhập bằng ${provider} thành công!`);
      setSnackbarSeverity('success');
      setShowSnackbar(true);
    }, 1500);
  };

  const handleForgotPassword = () => {
    setIsLoading(true);
    // TODO: Implement forgot password logic
    setTimeout(() => {
      setIsLoading(false);
      setShowForgotPasswordDialog(false);
      setSnackbarMessage('Vui lòng kiểm tra email để đặt lại mật khẩu');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
    }, 1500);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.gradient }}>
      <Container maxWidth="lg">
        {/* Search Bar with History */}
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
          <Paper sx={{ p: 1, display: 'flex', alignItems: 'center', width: 300 }}>
            <Autocomplete
              freeSolo
              options={searchOptions}
              value={searchValue}
              onChange={(_, newValue) => handleSearch(typeof newValue === 'string' ? newValue : newValue?.label || '')}
              onFocus={() => setShowSearchHistory(true)}
              onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Tìm kiếm..."
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Paper>
          {showSearchHistory && searchHistory.length > 0 && (
            <Paper
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                mt: 1,
                maxHeight: 300,
                overflow: 'auto',
              }}
            >
              <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Lịch sử tìm kiếm
                </Typography>
                <Button
                  size="small"
                  startIcon={<Delete />}
                  onClick={handleClearSearchHistory}
                >
                  Xóa tất cả
                </Button>
              </Box>
              <List>
                {searchHistory.map((item, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleRemoveFromHistory(item)}
                      >
                        <Close fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemButton onClick={() => handleSearch(item)}>
                      <ListItemIcon>
                        <History fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>

        {/* User Menu */}
        <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}>
          <IconButton onClick={handleProfileMenuOpen}>
            <AccountCircle sx={{ fontSize: 40 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={() => { handleProfileMenuClose(); setShowLoginDialog(true); }}>
              <ListItemIcon>
                <Login fontSize="small" />
              </ListItemIcon>
              <ListItemText>Đăng nhập</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/register'); }}>
              <ListItemIcon>
                <HowToReg fontSize="small" />
              </ListItemIcon>
              <ListItemText>Đăng ký</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleProfileMenuClose(); setShowContactDialog(true); }}>
              <ListItemIcon>
                <Message fontSize="small" />
              </ListItemIcon>
              <ListItemText>Liên hệ</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        {/* Hero Section */}
        <Box
          sx={{
            py: 8,
            textAlign: 'center',
            backgroundImage: 'url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            mb: 6,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.5)',
              zIndex: 1,
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 2, p: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white' }}>
                Hệ thống truy xuất nguồn gốc thực phẩm
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, color: 'white' }}>
                Minh bạch - An toàn - Bền vững
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Bắt đầu ngay
              </Button>
            </motion.div>
          </Box>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 3,
                    bgcolor: stat.color.light,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => handleLearnMore()}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: stat.color.main,
                      mb: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                  onClick={() => handleFeatureClick(index)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={feature.image}
                    alt={feature.title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: 'rgba(0,0,0,0.3)',
                    }}
                  />
                  <CardContent
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      color: 'white',
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: `${feature.color}.main`,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {feature.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color={feature.color as any}
                      sx={{ mt: 'auto' }}
                    >
                      Tìm hiểu thêm
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Feature Dialog */}
        <Dialog
          open={showFeatureDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedFeature !== null && (
            <>
              <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5">
                    {features[selectedFeature].title}
                  </Typography>
                  <IconButton onClick={handleCloseDialog}>
                    <Close />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" paragraph>
                    {features[selectedFeature].description}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Với tính năng này, bạn có thể:
                  </Typography>
                  <ul>
                    <li>Theo dõi toàn bộ quá trình sản xuất và phân phối</li>
                    <li>Xác thực nguồn gốc sản phẩm</li>
                    <li>Đảm bảo tính minh bạch trong chuỗi cung ứng</li>
                  </ul>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Đóng</Button>
                <Button
                  variant="contained"
                  color={features[selectedFeature].color as any}
                  onClick={() => {
                    handleCloseDialog();
                    navigate('/register');
                  }}
                >
                  Đăng ký ngay
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* CTA Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundImage: 'url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.6)',
              zIndex: 1,
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 2, p: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" component="h2" gutterBottom sx={{ color: 'white' }}>
                Sẵn sàng tham gia?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, color: 'white' }}>
                Hãy bắt đầu hành trình minh bạch hóa nguồn gốc thực phẩm cùng chúng tôi
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Đăng ký ngay
              </Button>
            </motion.div>
          </Box>
        </Box>

        {/* Contact Dialog */}
        <Dialog open={showContactDialog} onClose={() => setShowContactDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Liên hệ với chúng tôi</DialogTitle>
          <form onSubmit={handleContactSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nội dung"
                    multiline
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Message />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowContactDialog(false)}>Hủy</Button>
              <Button type="submit" variant="contained" startIcon={<Send />}>
                Gửi
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Login Dialog with Social Login */}
        <Dialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Đăng nhập</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Mật khẩu"
                type={loginForm.showPassword ? 'text' : 'password'}
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Security />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setLoginForm({ ...loginForm, showPassword: !loginForm.showPassword })}
                      >
                        {loginForm.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ mt: 1, textAlign: 'right' }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    setShowLoginDialog(false);
                    setShowForgotPasswordDialog(true);
                  }}
                >
                  Quên mật khẩu?
                </Link>
              </Box>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Hoặc đăng nhập bằng
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton
                  onClick={() => handleSocialLogin('google')}
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Google />
                </IconButton>
                <IconButton
                  onClick={() => handleSocialLogin('facebook')}
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  onClick={() => handleSocialLogin('apple')}
                  sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  <Apple />
                </IconButton>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLoginDialog(false)}>Hủy</Button>
            <Button
              onClick={handleLogin}
              variant="contained"
              startIcon={isLoading ? <CircularProgress size={20} /> : <Login />}
              disabled={isLoading}
            >
              Đăng nhập
            </Button>
          </DialogActions>
        </Dialog>

        {/* Forgot Password Dialog */}
        <Dialog open={showForgotPasswordDialog} onClose={() => setShowForgotPasswordDialog(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Quên mật khẩu</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowForgotPasswordDialog(false)}>Hủy</Button>
            <Button
              onClick={handleForgotPassword}
              variant="contained"
              startIcon={isLoading ? <CircularProgress size={20} /> : <LockReset />}
              disabled={isLoading}
            >
              Gửi yêu cầu
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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

export default Home; 