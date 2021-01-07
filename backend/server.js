const express = require('express')
require('express-async-errors')
const cors = require('cors')
const loginRouter = require('./routes/login')
const userRouter = require('./routes/users')
const mongoose = require('mongoose')
const middlewares = require('./utils/middlewares')
const config = require('./utils/config')
const app = express()
//const logger = require('./utils/logger')
app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)

if (process.env.NODE_ENV === 'local') {
  const { mongodb } = require('./mongodb')
  mongodb().then(uri => {
    console.log('MongodbURI:', uri)
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    const connection = mongoose.connection
    connection.once('open', () => {
      console.log('MongoDB connection established')
    })
  })
} else {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  const connection = mongoose.connection
  connection.once('open', () => {
    console.log('MongoDB connection established')
  })
}

const issuesRouter = require('./routes/issues')
const labelsRouter = require('./routes/labels')

if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') {
  const { mongoStop } = require('./mongodb')
  app.use('/mongodb', mongoStop)
}

process.env.NODE_ENV !== 'production'
  ? app.use('/', express.Router().get('', (req, res) => {
    res.status(200).send('Issue Tracker Backend is Running...')
  })) : null

app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/issue', issuesRouter)
app.use('/label', labelsRouter)
app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)

module.exports = app
