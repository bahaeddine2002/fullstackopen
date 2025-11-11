import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, addComment, likeBlog } from '../reducers/blogreducer'
import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Stack,
  Divider,
  TextField,
  Button,
  Container,
  CardMedia,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const blog = useSelector((state) =>
    state.blogs.items.find((b) => b.id === id)
  )
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState('')

  if (!blog) {
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        Loading blog...
      </Typography>
    )
  }

  const handleLike = () => dispatch(likeBlog(blog))
  const handleDelete = () => {
    if (window.confirm(`Delete "${blog.title}"?`)) {
      dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }
  const handleComment = (e) => {
    e.preventDefault()
    dispatch(addComment({ content: comment }, id))
    setComment('')
  }

  const userHasLiked = blog.likes.some(
    (liker) => (liker.id || liker) === user.id
  )

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: { xs: 2, sm: 5 }, borderRadius: 3 }}>
        {blog.imageUrl && (
          <CardMedia
            component="img"
            height="300"
            image={`http://localhost:3003/${blog.imageUrl.replace(/\\/g, '/')}`}
            alt={blog.title}
            sx={{ borderRadius: 2, mb: 4 }}
          />
        )}
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          by {blog.user?.name}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button
            variant={userHasLiked ? 'contained' : 'outlined'}
            color={userHasLiked ? 'error' : 'primary'}
            startIcon={userHasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            onClick={handleLike}
          >
            {blog.likes.length} Likes
          </Button>
          {blog.user?.username === user.username && (
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Stack>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h5" sx={{ mb: 2 }}>
          Comments
        </Typography>
        <Box component="form" onSubmit={handleComment} sx={{ mb: 3 }}>
          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            label="Add a comment"
            multiline
            minRows={2}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            Post Comment
          </Button>
        </Box>
        <Stack spacing={1}>
          {blog.comments.map((c) => (
            <Paper key={c.id} sx={{ p: 2 }}>
              <Typography variant="body2">{c.content}</Typography>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Container>
  )
}

export default Blog
