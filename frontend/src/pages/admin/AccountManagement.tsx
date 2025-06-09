import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Avatar,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Snackbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin': return 'error';
    case 'supplier': return 'primary';
    case 'customer': return 'success';
    default: return 'default';
  }
};

const AccountManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ email: '', role: '', address: '', phone: '', businessName: '', businessType: '', taxCode: '' });
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users');
      setUsers(res.data.data);
    } catch (err: any) {
      setError('Không thể tải danh sách tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Sửa user
  const handleEditClick = (user: User) => {
    setEditUser(user);
    setEditForm({
      email: user.email || '',
      role: user.role || '',
      address: user.address || '',
      phone: user.phone || '',
      businessName: user.businessName || '',
      businessType: user.businessType || '',
      taxCode: user.taxCode || '',
    });
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setEditUser(null);
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSubmit = async () => {
    if (!editUser) return;
    try {
      await axios.put(`/api/users/${editUser._id}`, editForm);
      setSnackbar({ open: true, message: 'Cập nhật thành công!', severity: 'success' });
      setEditOpen(false);
      fetchUsers();
    } catch (err) {
      setSnackbar({ open: true, message: 'Cập nhật thất bại!', severity: 'error' });
    }
  };

  // Xóa user
  const handleDeleteClick = (user: User) => {
    setDeleteUser(user);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteUser(null);
  };
  const handleDeleteConfirm = async () => {
    if (!deleteUser) return;
    try {
      await axios.delete(`/api/users/${deleteUser._id}`);
      setSnackbar({ open: true, message: 'Đã xóa tài khoản!', severity: 'success' });
      setDeleteOpen(false);
      fetchUsers();
    } catch (err) {
      setSnackbar({ open: true, message: 'Xóa thất bại!', severity: 'error' });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3, width: '100%' }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow sx={{ background: 'linear-gradient(90deg, #232526 0%, #414345 100%)' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Tên</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Vai trò</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }} align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, idx) => (
                <TableRow
                  key={user._id}
                  hover
                  sx={{ transition: 'background 0.2s', '&:hover': { background: 'rgba(33,150,243,0.07)' } }}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32 }}>
                        {user.name ? user.name.charAt(0).toUpperCase() : <PersonIcon />}
                      </Avatar>
                      <Typography fontWeight={500}>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={getRoleColor(user.role)}
                      size="small"
                      sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Sửa">
                      <IconButton size="small" sx={{ color: 'green' }} onClick={() => handleEditClick(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton size="small" sx={{ color: 'red' }} onClick={() => handleDeleteClick(user)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Dialog cập nhật user */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Cập nhật tài khoản</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Email" name="email" value={editForm.email} onChange={handleEditChange} fullWidth />
          <TextField label="Vai trò" name="role" value={editForm.role} onChange={handleEditChange} select fullWidth>
            <MenuItem value="supplier">Supplier</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <TextField label="Địa chỉ" name="address" value={editForm.address} onChange={handleEditChange} fullWidth />
          <TextField label="Số điện thoại" name="phone" value={editForm.phone} onChange={handleEditChange} fullWidth />
          <TextField label="Tên doanh nghiệp" name="businessName" value={editForm.businessName} onChange={handleEditChange} fullWidth />
          <TextField label="Loại doanh nghiệp" name="businessType" value={editForm.businessType} onChange={handleEditChange} fullWidth />
          <TextField label="Mã số thuế" name="taxCode" value={editForm.taxCode} onChange={handleEditChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Hủy</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="success">Cập nhật</Button>
        </DialogActions>
      </Dialog>
      {/* Dialog xác nhận xóa */}
      <Dialog open={deleteOpen} onClose={handleDeleteClose} maxWidth="xs">
        <DialogTitle>Xác nhận xóa tài khoản?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Hủy</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{ sx: { bgcolor: snackbar.severity === 'success' ? 'success.main' : 'error.main', color: '#fff' } }}
      />
    </Box>
  );
};

export default AccountManagement; 