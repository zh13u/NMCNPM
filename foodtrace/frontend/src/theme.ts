import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    gradient: string;
  }
  interface Palette {
    custom: {
      green: {
        light: string;
        main: string;
        dark: string;
      };
      orange: {
        light: string;
        main: string;
        dark: string;
      };
      blue: {
        light: string;
        main: string;
        dark: string;
      };
      purple: {
        light: string;
        main: string;
        dark: string;
      };
    };
  }
  interface PaletteOptions {
    custom?: {
      green?: {
        light?: string;
        main?: string;
        dark?: string;
      };
      orange?: {
        light?: string;
        main?: string;
        dark?: string;
      };
      blue?: {
        light?: string;
        main?: string;
        dark?: string;
      };
      purple?: {
        light?: string;
        main?: string;
        dark?: string;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
      gradient: 'linear-gradient(135deg, #E3F2FD 0%, #F1F8E9 100%)',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    custom: {
      green: {
        light: '#E8F5E9',
        main: '#4CAF50',
        dark: '#2E7D32',
      },
      orange: {
        light: '#FFF3E0',
        main: '#FF9800',
        dark: '#E65100',
      },
      blue: {
        light: '#E3F2FD',
        main: '#2196F3',
        dark: '#1565C0',
      },
      purple: {
        light: '#EDE7F6',
        main: '#673AB7',
        dark: '#4527A0',
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#212121',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#212121',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#212121',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#212121',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#212121',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#212121',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#757575',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#757575',
    },
    body1: {
      fontSize: '1rem',
      color: '#212121',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#757575',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
        },
      },
    },
  },
});

export default theme; 