// src/components/Login.jsx - The Enhanced Version
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import Notifiction from './Notification'
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Container,
  Divider, // For a visual separator
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google' // A nice icon for our button

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onlogin = (e) => {
    e.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <Container
      maxWidth="xs" // Using a smaller container for a login form looks better
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh', // Adjust height as needed
      }}
    >
      <Notifiction />
      <Paper
        sx={{
          p: 4, // A little less padding
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.05)', // A softer shadow
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
          Sign in to your account
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Welcome back! Please enter your details.
        </Typography>

        {/* --- THE NEW GOOGLE BUTTON --- */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          component="a" // IMPORTANT: This tells MUI to render the button as an <a> tag
          href="http://localhost:3003/api/auth/google" // IMPORTANT: This points directly to your backend
          sx={{
            mb: 2,
            textTransform: 'none',
            color: 'text.primary',
            borderColor: 'grey.300',
          }}
        >
          Sign in with Google
        </Button>
        {/* --- END NEW BUTTON --- */}

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Box component="form" onSubmit={onlogin}>
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button variant="contained" type="submit" size="large" fullWidth>
              Sign In
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
