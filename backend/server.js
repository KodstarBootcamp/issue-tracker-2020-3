const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const middlewares = require('./utils/middlewares')
const config = require('./utils/config')
const app = express()
app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)
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

const issuesRouter = require('./routes/issues')
const labelsRouter = require('./routes/labels')

process.env.NODE_ENV !== 'production'
  ? app.use('/', express.Router().get('', (req, res) => {
    res.status(200).send('Issue Tracker Backend is Running...')
  })) : null

app.use('/issue', issuesRouter)
app.use('/label', labelsRouter)
app.use(middlewares.errorHandler)
app.use(middlewares.unknownEndpoint)

module.exports = app
