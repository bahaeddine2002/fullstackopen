// src/components/FadeInBox.jsx
import { Box } from '@mui/material'

const FadeInBox = ({ children, duration = 0.6 }) => (
  <Box
    sx={{
      animation: `fadeIn ${duration}s ease-in-out`,
      '@keyframes fadeIn': {
        from: { opacity: 0, transform: 'translateY(12px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
      },
    }}
  >
    {children}
  </Box>
)

export default FadeInBox
