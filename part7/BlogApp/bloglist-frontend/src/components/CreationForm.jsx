// src/components/NewBlogForm.jsx - FULL CODE

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogreducer'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

const NewBlogForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 1. Local state to manage the form inputs
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (event) => {
    // Get the first file from the file input
    if (event.target.files.length > 0) {
      setImageFile(event.target.files[0])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    // 2. Create a FormData object to package the data
    const formData = new FormData()
    formData.append('title', title)
    formData.append('author', author)
    formData.append('url', url)
    if (imageFile) {
      formData.append('image', imageFile) // The 'image' key must match the backend (multer)
    }

    try {
      // 3. Dispatch the thunk with the FormData object
      await dispatch(createBlog(formData))

      // 4. On success, navigate the user to the home page
      navigate('/')
    } catch (error) {
      console.error('Failed to create blog post:', error)
      // You can dispatch a notification for the error here
      setIsSubmitting(false) // Re-enable the button on failure
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 4, textAlign: 'center' }}
        >
          Create a New Story
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Author Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Source URL (e.g., https://my-portfolio.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              fullWidth
            />

            <Button
              variant="outlined"
              component="label"
              startIcon={<AddPhotoAlternateIcon />}
            >
              Upload Cover Image
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/png, image/jpeg" // Restrict to common image types
              />
            </Button>

            {/* Provide user feedback for the selected file */}
            {imageFile && (
              <Typography variant="body2" color="text.secondary">
                Selected: {imageFile.name}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting} // Disable button while submitting
              sx={{ mt: 2, py: 1.5 }}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

export default NewBlogForm
