const { MongoMemoryReplSet } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const router = require('express').Router()
const Issue = require('./models/issue.model')
const Label = require('./models/label.model')

const replSet = new MongoMemoryReplSet({
  replSet: {
    storageEngine: 'wiredTiger',
    dbName:'issueTrackerDB'
  },
  instanceOpts: [
    {
      port: 59759,
      dbPath: './DB',
    }
  ],
})

const mongodb = async () => {
  await replSet.waitUntilRunning()
  const uri = await replSet.getUri()
  return uri
}

router.delete('/all', async (req, res) => {
  await Issue.deleteMany({})
  await Label.deleteMany({})
  res.status(200).send('All data deleted from DB.').end()
})

router.get('/stop', (req,res) => {
  mongoose.disconnect()
  replSet.stop()
  res.status(200).send('DB shut down.').end()
})
module.exports = {
  replSet,
  mongodb,
  mongoStop:router
}
