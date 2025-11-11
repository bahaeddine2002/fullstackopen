require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('conntecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('conntectes to mongoDB')
    logger.info('welcome to', process.env.NODE_ENV)
  })
  .catch((error) => {
    logger.error('error conntecting to MongoDB:', error.message)
  })


  app.use(express.json())
  app.use(middleware.tokenExtractor)

  app.use('/api/blogs', blogsRouter)
  app.use('/api/users',usersRouter)
  app.use('/api/login',loginRouter)

  if(process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/tetsing', testingRouter)
  }
  
  app.use(middleware.errorHandling)

  module.exports = app 