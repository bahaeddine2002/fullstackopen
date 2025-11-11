import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
} from '@mui/material'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const formattedDate = blog.createdAt
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(blog.createdAt))
    : 'Unknown date'

  return (
    <Card
      component={Link}
      to={`/blogs/${blog.id}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.02)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={blog.image || `https://picsum.photos/800/600?random=${blog.id}`}
        alt={blog.title}
      />

      {/* Text Content */}
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {blog.title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          {blog.excerpt || blog.url}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'primary.main',
              fontSize: 14,
            }}
          >
            {blog.author ? blog.author[0].toUpperCase() : '?'}
          </Avatar>
          <Typography variant="caption">{blog.author}</Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', ml: 1 }}>
            {formattedDate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BlogCard
