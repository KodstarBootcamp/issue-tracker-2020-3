const { mongodb } = require('./mongodb')
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
  })
}
