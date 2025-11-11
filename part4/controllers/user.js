const UserRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const logger = require('../utils/logger')


UserRouter.post('/', async (request, response,next) => {
  const {username, password, name} = request.body
  
  if(!password){
    return response.status(400).json({ error: 'password must be  given'})
  }
  if( password.length <= 3 ){
    return response.status(400).json({ error: 'password must be at least 3 characters long'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username : username,
    passwordHash: passwordHash,
    name: name
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

UserRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', {title: 1, author: 1, url: 1})
    
  response.json(users)
})

UserRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  response.json(user)
})

UserRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndDelete(request.params.id)
  response.status(204)
})

module.exports = UserRouter