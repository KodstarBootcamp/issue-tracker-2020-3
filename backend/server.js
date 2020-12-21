const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.MONGODB_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB connection established')
})

const issuesRouter = require('./routes/issues')

app.use('/issues', issuesRouter)

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})