import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  size?: 'small' | 'medium' | 'large';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 'medium' }) => {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          size={size}
          sx={{
            bgcolor: mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              bgcolor: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {mode === 'light' ? (
            <Brightness4 sx={{ color: theme.palette.text.primary }} />
          ) : (
            <Brightness7 sx={{ color: theme.palette.text.primary }} />
          )}
        </IconButton>
      </motion.div>
    </Tooltip>
  );
};

export default ThemeToggle;
