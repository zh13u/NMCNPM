import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Business as BusinessIcon,
  LocationOn,
  Phone,
  Email,
  Web,
  Timeline,
  Verified,
  Security,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const BusinessPage: React.FC = () => {
  return (
    <Box>
      {/* Business Info Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
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
                    bgcolor: 'primary.main',
                    mb: 2,
                  }}
                >
                  <BusinessIcon style={{ fontSize: 60 }} />
                </Avatar>
                {/* ... rest of the code ... */}
              </Box>
            </Grid>
            {/* ... rest of the code ... */}
          </Grid>
        </CardContent>
      </Card>
      {/* ... rest of the code ... */}
    </Box>
  );
};

export default BusinessPage; 