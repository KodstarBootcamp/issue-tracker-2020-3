const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user.model')
const { checkToken } = require('../utils/utils')

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password || !body.username) {
    return res.status(400).json({ error:'password or username missing' })
  } else if (body.password.length < 3) {
    return res.status(400).json({ error:'password should be at 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    email: body.email
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async(req, res) => {
  checkToken(req)
  const filter = {}
  req.query.username && (filter.username = req.query.username)
  const users = await User.find(filter)
  res.json(users)
})

module.exports = usersRouter
