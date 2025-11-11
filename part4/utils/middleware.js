const { error } = require("./logger")
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandling = (error, request, response, next) => {
  if(error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  } else if(error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return response.status(400).json({ error : 'expected `username` to be unique' })
  } else if(error.name === 'JsonWebTokenError') {
    return response.status(401).json({error : 'token invalid'})
  }else if(error.name === 'CastError') {
    return response.status(400).json({ error : 'invalid id'})
  }
  console.log(error)
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = null
  if (authorization && authorization.startsWith('Bearer ')){
    token = authorization.replace('Bearer ', '')
  }
  request.token = token
  next()
}

const userExtractor = async (request, response, next) => {
   const decodedToken = jwt.verify(request.token, process.env.SECRET )
    if(!decodedToken.id){
      return response.status(401).json({error : 'invalid token'})
    }
  
    const user = await User.findById(decodedToken.id)
  
    request.user = user

    next()
}

module.exports = { errorHandling, tokenExtractor, userExtractor }