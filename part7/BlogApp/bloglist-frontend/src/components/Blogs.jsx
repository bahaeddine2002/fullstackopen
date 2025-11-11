// src/components/Blogs.jsx (or wherever this component lives)

import { useSelector } from 'react-redux'
import BlogCard from './BlogCard'
import { Grid, Typography } from '@mui/material' // Added Typography for a title

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs.items)

  // Best Practice: Handle the case where there are no blogs to display.
  if (!blogs || blogs.length === 0) {
    return <Typography>No blog posts found.</Typography>
  }

  return (
    // It's good practice to add a title to your page components
    <div>
      <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
        All Posts
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Blogs
