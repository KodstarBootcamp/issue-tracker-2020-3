const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user.model')

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password || !body.username) {
    return res.status(401).send('password or username missing')
  } else if (body.password.length < 3) {
    return res.status(402).send('password should be at 3 characters long')
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    email: body.email
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

usersRouter.get('/', async(req, res) => {
  const users = await User
    .find({})
    .populate('issues', { title: 1, id: 1 })
  res.json(users)
})

module.exports = usersRouter
