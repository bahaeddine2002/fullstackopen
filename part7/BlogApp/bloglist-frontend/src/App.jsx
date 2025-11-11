import { useState, useEffect } from 'react'
import Header from './components/Header'
import Login from './components/Login'
import Dashbord from './components/Dashbord'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlog } from './reducers/blogreducer'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route, Link, useMatch, Navigate } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { Box, Container, CircularProgress } from '@mui/material'
import Footer from './components/Footer'
import CreationForm from './components/CreationForm'

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user)
  return user ? children : <Navigate to="/login" />
}

const App = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  const user = useSelector((state) => state.user)

  useEffect(() => {
    console.log('A. --- useEffect triggered ---')

    dispatch(initializeUser()).finally(() => {
      setIsInitializing(false)
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch])

  console.log(user)

  const match = useMatch('/users/:id')
  const selectedUser =
    match && users ? users.find((user) => user.id === match.params.id) : null
  console.log(selectedUser)

  if (isInitializing) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        bgcolor: '#f9fafb',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* The Header and Footer are now part of the layout and only show if a user is logged in */}
      {user && <Header />}

      <Container component="main" maxWidth="xl" sx={{ py: 6, flexGrow: 1 }}>
        <Routes>
          {/* --- PUBLIC ROUTE --- */}
          {/* If the user is logged in and tries to go to /login, redirect them to the home page. */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          {/* --- PRIVATE (PROTECTED) ROUTES --- */}
          {/* We wrap our private components in the PrivateRoute gatekeeper. */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashbord />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />

          {/* Note: It's good practice to protect the single blog view as well. */}
          <Route
            path="/blogs/:id"
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          />

          {/* This is a catch-all that redirects any unknown URL to the home page. */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route
            path="/explore"
            element={
              <PrivateRoute>
                <div>Explore Page Coming Soon!</div>
              </PrivateRoute>
            }
          />
          <Route
            path="/blogs/new"
            element={
              <PrivateRoute>
                <CreationForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>

      {user && <Footer />}
    </Box>
  )
}

export default App
