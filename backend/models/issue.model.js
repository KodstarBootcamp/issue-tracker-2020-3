const mongoose = require('mongoose')

const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  labels: { type: Array, required: true }
})

const Issue = mongoose.model('Issue', issueSchema)
module.exports = Issue