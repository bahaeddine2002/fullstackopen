import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = {
  items: [],
  totalPages: 1,
  currentPage: 1,
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    appendBlog(state, action) {
      state.items.push(action.payload)
    },
    setBlogs(state, action) {
      if (Array.isArray(action.payload)) {
        state.items = action.payload
        state.totalPages = 1
        state.currentPage = 1
      } else {
        // If payload is paginated (trending)
        state.items = action.payload.blogs
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      }
    },
    updateBlogInList(state, action) {
      const updatedBlog = action.payload
      state.items = state.items.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlogFromList(state, action) {
      const idToRemove = action.payload
      state.items = state.items.filter((blog) => blog.id !== idToRemove)
    },
  },
})

export const { setBlogs, appendBlog, updateBlogInList, removeBlogFromList } =
  blogSlice.actions

export const initializeBlog = (page = 1) => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch(setBlogs(data))
  }
}

export const createBlog = (newBloge) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBloge)
    dispatch(appendBlog(createdBlog))
    return createdBlog
  }
}

export const addComment = (obj, id) => {
  return async (dispatch) => {
    const updatedBlogWithComment = await blogService.createComment(obj, id)

    dispatch(updateBlogInList(updatedBlogWithComment))
  }
}

export const updateBlog = (updatedBlogObject) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(
      updatedBlogObject,
      updatedBlogObject.id
    )
    dispatch(updateBlogInList(returnedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.del(id)
    dispatch(removeBlogFromList(id))
  }
}

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.like(blogObject.id)
      dispatch(updateBlogInList(updatedBlog))
      console.log(updateBlog)
    } catch (error) {
      console.error('Failed to like the blog:', error)
      dispatch(setNotifiction('An error occurred while liking the post.'))
    }
  }
}

export default blogSlice.reducer
