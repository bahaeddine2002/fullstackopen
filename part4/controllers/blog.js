const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')




blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
    .populate('user', {username: 1, name: 1})
  response.json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  
  const result = await Blog.findById(request.params.id)
    .populate('user',{username:1, name:1})
  if(!result){
    return response.status(404).json({error: `blog dosn't exist`})
  }
  response.json(result)
})

blogsRouter.post('/',middleware.userExtractor, async (request, response) => {
  
  const body = request.body
  const user = request.user

  if (!body.url || !body.title){
    return response.status(400).end()
  }
  

  const blog = new Blog({
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes || 0,
    user : user._id
  })

  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const result = await savedBlog
    .populate('user', {username: 1, name: 1})

  
  response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
 console.log(request)
 console.log('baha')
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  console.log(user)
  
  if(blog && user){
    if(user._id.toString() !== blog.user.toString()){
      return response.status(401).json({ error : 'only the owner of the blog can delte it'})
    }
    const result = await Blog.findByIdAndDelete(request.params.id)
  }
  
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end
  }
  
  blog.title = body.title || blog.title
  blog.author = body.author || blog.author
  blog.url = body.url || blog.url
  blog.likes = body.likes || blog.likes

  const updatedBlog = await blog.save()
  const result = await updatedBlog
    .populate('user', {username: 1, name: 1})
  response.json(result)
  

})

module.exports = blogsRouter
