import React, { useState } from 'react';
import { BLOCKCHAIN_API } from '../../config';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';

const ProductsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    id: '',
    actor: '',
    location: '',
    step: '',
    otherStep: '',
    qualityStatus: '',
    details: '',
    otherQualityStatus: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<any>(null);
  const [qrUrl, setQrUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessData(null);
    setQrUrl('');
    try {
      // Nếu chọn "Khác" thì sử dụng giá trị của otherStep và otherQualityStatus
      const stepValue = formData.step === 'Khác' ? formData.otherStep : formData.step;
      const qualityStatusValue = formData.qualityStatus === 'Khác' ? formData.otherQualityStatus : formData.qualityStatus;

      const response = await fetch(`${BLOCKCHAIN_API}/api/addStep`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          step: stepValue,
          qualityStatus: qualityStatusValue
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Cập nhật trạng thái thất bại');
      setSuccessData(data);
      setQrUrl(`${BLOCKCHAIN_API}/api/getQRCode/${formData.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi khi cập nhật trạng thái');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Cập nhật trạng thái sản phẩm
        </Typography>
        <Paper sx={{ p: 3 }}>
          {successData ? (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Alert severity="success" sx={{ mb: 2 }}>Cập nhật trạng thái thành công!</Alert>
              <Typography variant="body1" gutterBottom>
                Mã Sản Phẩm: {formData.id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Bước: {successData.step}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <img src={qrUrl} alt="QR Code" style={{ width: 200, height: 200 }} crossOrigin="anonymous" />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Quét mã QR để xem thông tin sản phẩm
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hoặc truy cập: <a href={`${BLOCKCHAIN_API}/product/${formData.id}`} target="_blank" rel="noopener noreferrer">{`${BLOCKCHAIN_API}/product/${formData.id}`}</a>
              </Typography>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                label="Mã Sản Phẩm (ID)"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Người thực hiện (actor)"
                name="actor"
                value={formData.actor}
                onChange={handleChange}
                required
              />
              <TextField
                margin="normal"
                fullWidth
                label="Địa điểm (location)"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Bước (step)</InputLabel>
                <Select
                  name="step"
                  value={formData.step}
                  onChange={handleChange}
                  required
                  label="Bước (step)"
                >
                  <MenuItem value="Thu hoạch">Thu hoạch</MenuItem>
                  <MenuItem value="Chế biến">Chế biến</MenuItem>
                  <MenuItem value="Đóng gói">Đóng gói</MenuItem>
                  <MenuItem value="Vận chuyển">Vận chuyển</MenuItem>
                  <MenuItem value="Hoàn thành">Hoàn thành</MenuItem>
                  <MenuItem value="Khác">Khác</MenuItem>
                </Select>
              </FormControl>

              {formData.step === 'Khác' && (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Chi tiết bước khác"
                  name="otherStep"
                  value={formData.otherStep}
                  onChange={handleChange}
                  required
                />
              )}

              <FormControl fullWidth margin="normal">
                <InputLabel>Trạng thái chất lượng (qualityStatus)</InputLabel>
                <Select
                  name="qualityStatus"
                  value={formData.qualityStatus}
                  onChange={handleChange}
                  required
                  label="Trạng thái chất lượng (qualityStatus)"
                >
                  <MenuItem value="Kém">Kém</MenuItem>
                  <MenuItem value="Trung bình">Trung bình</MenuItem>
                  <MenuItem value="Khá">Khá</MenuItem>
                  <MenuItem value="Tốt">Tốt</MenuItem>
                  <MenuItem value="Khác">Khác</MenuItem>
                </Select>
              </FormControl>
              {formData.qualityStatus === 'Khác' && (
                <TextField
                  margin="normal"
                  fullWidth
                  label="Chi tiết trạng thái chất lượng khác"
                  name="otherQualityStatus"
                  value={formData.otherQualityStatus || ''}
                  onChange={handleChange}
                  required
                />
              )}
              <TextField
                margin="normal"
                fullWidth
                label="Chi tiết (details)"
                name="details"
                value={formData.details}
                onChange={handleChange}
                multiline
                rows={2}
              />
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Cập nhật trạng thái'}
              </Button>
            </form>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductsPage; 