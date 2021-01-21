const { mongodb } = require('./mongodb')
const Issue = require('./models/issue.model')
const State = require('./models/state.model')
const Label = require('./models/label.model')
const User = require('./models/user.model')
const mongoose = require('mongoose')

module.exports = async () => {
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
  }).then(await State.deleteMany({}))
    .then(await Label.deleteMany({}))
    .then(await User.deleteMany({}))
    .then(await Issue.deleteMany({}))
}
