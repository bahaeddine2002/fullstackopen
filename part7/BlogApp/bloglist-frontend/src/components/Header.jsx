import Notifiction from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const navLinks = [
    { title: 'Feed', path: '/' },
    { title: 'Explore', path: '/explore' }, // Added Explore
    { title: 'Users', path: '/users' },
  ]

  const onlogout = () => {
    dispatch(logout())
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        muse.
      </Typography>
      <List>
        {navLinks.map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            to={item.path}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem component={RouterLink} to="/blogs/new" disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Write a Post" />
          </ListItemButton>
        </ListItem>

        <ListItem button onClick={onlogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#ffffff',
          color: 'text.primary',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Toolbar>
          {/* logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            muse.
          </Typography>

          {/* desktop nav */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 2,
            }}
          >
            {navLinks.map((item) => (
              <Button
                key={item.title}
                component={Link}
                to={item.path}
                sx={{
                  textTransform: 'none',
                  color: 'text.primary',
                  fontWeight: 500,
                }}
              >
                {item.title}
              </Button>
            ))}
            <Button
              component={Link}
              to="/blogs/new" // This will be the route for our creation form
              variant="contained"
              color="primary" // Use your theme's primary color
              sx={{ ml: 2 }} // Add some margin
            >
              Write a Post
            </Button>
            <Typography variant="body2" sx={{ mx: 2 }}>
              {user.name}
            </Typography>
            <Button
              onClick={onlogout}
              variant="contained"
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                bgcolor: '#16a34a',
                '&:hover': { bgcolor: '#15803d' },
              }}
            >
              Logout
            </Button>
          </Box>

          {/* mobile menu icon */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Header
