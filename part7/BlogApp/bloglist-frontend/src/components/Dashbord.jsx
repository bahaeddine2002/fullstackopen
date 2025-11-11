// src/components/Dashboard.jsx
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlog } from '../reducers/blogreducer'
import {
  Box,
  Typography,
  Grid,
  Container,
  Pagination,
  CircularProgress,
} from '@mui/material'
import BlogCard from './BlogCard'

const Dashboard = () => {
  const { items: blogs } = useSelector((state) => state.blogs)

  if (!blogs) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" sx={{ my: 4 }}>
        All Blogs
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Dashboard
