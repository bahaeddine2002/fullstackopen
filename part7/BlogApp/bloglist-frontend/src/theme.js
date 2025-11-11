import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    mode: 'light',
    background: { default: '#f9fafb', paper: '#ffffff' },
    primary: { main: '#16a34a' },
    secondary: { main: '#2563eb' },
    text: { primary: '#111827', secondary: '#6b7280' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.75rem', lineHeight: 1.2 },
    h2: { fontWeight: 600, fontSize: '2rem', lineHeight: 1.3 },
    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.4 },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 500, fontSize: '1.1rem' },
    h6: { fontWeight: 500, fontSize: '1rem' },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.9rem', lineHeight: 1.6, color: '#6b7280' },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
  shadows: Array(25).fill('0 4px 20px rgba(0,0,0,0.05)'),
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.25s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: 'none',
          },
        },
      },
    },
  },
})
