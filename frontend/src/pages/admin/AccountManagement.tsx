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

  useEffect(() => {
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
    fetchUsers();
  }, []);

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
                      <IconButton size="small" color="primary" disabled>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton size="small" color="error" disabled>
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
    </Box>
  );
};

export default AccountManagement; 