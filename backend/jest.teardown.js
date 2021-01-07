const mongoose = require('mongoose')
const { replSet } = require('./mongodb')

module.exports = async () => {
  mongoose.connection.close()
  await replSet.stop()
}
