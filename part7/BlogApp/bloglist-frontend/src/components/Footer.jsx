// src/components/Footer.jsx
import { Box, Typography, Link as MuiLink } from '@mui/material'

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: 'background.paper',
      borderTop: '1px solid #e5e7eb',
      py: 3,
      textAlign: 'center',
      mt: 'auto',
    }}
  >
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} BahaEddine Azouz · Built with React & MUI
    </Typography>
    <MuiLink
      href="https://github.com/bahaeddine2002"
      target="_blank"
      underline="hover"
      sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
    >
      View Source on GitHub
    </MuiLink>
  </Box>
)

export default Footer
