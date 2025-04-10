import { createTheme, ThemeOptions } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

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

// Define theme settings based on mode (light/dark)
const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode palette
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
            gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%)',
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
        }
      : {
          // Dark mode palette
          primary: {
            main: '#81C784',
            light: '#A5D6A7',
            dark: '#4CAF50',
            contrastText: '#121212',
          },
          secondary: {
            main: '#FFB74D',
            light: '#FFCC80',
            dark: '#FF9800',
            contrastText: '#121212',
          },
          success: {
            main: '#81C784',
            light: '#A5D6A7',
            dark: '#4CAF50',
            contrastText: '#121212',
          },
          warning: {
            main: '#FFB74D',
            light: '#FFCC80',
            dark: '#FF9800',
            contrastText: '#121212',
          },
          error: {
            main: '#E57373',
            light: '#EF9A9A',
            dark: '#F44336',
            contrastText: '#121212',
          },
          info: {
            main: '#64B5F6',
            light: '#90CAF9',
            dark: '#2196F3',
            contrastText: '#121212',
          },
          background: {
            default: '#121212',
            paper: '#1E1E1E',
            gradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(33, 150, 243, 0.2) 100%)',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#B0B0B0',
          },
          custom: {
            green: {
              light: '#388E3C',
              main: '#81C784',
              dark: '#E8F5E9',
            },
            orange: {
              light: '#E65100',
              main: '#FFB74D',
              dark: '#FFF3E0',
            },
            blue: {
              light: '#1565C0',
              main: '#64B5F6',
              dark: '#E3F2FD',
            },
            purple: {
              light: '#4527A0',
              main: '#9575CD',
              dark: '#EDE7F6',
            },
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
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
          transition: 'all 0.3s ease',
        } as any,
        contained: {
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)',
          },
        } as any,
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-2px)',
          },
        } as any,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.12)',
          },
        } as any,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
        },
        elevation1: {
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        },
        elevation2: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s ease',
            '&.Mui-focused': {
              boxShadow: '0px 0px 0px 3px rgba(76, 175, 80, 0.1)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-2px)',
          },
        },
        colorPrimary: {
          background: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
        },
        colorSecondary: {
          background: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 40,
          height: 40,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          border: '2px solid #fff',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.08)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
        },
      },
    },
  }
});

// Create a theme instance with light mode by default
const lightTheme = createTheme(getDesignTokens('light'));
const darkTheme = createTheme(getDesignTokens('dark'));

export { lightTheme, darkTheme };
export default lightTheme;