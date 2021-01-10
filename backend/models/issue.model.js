const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  labels: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Label'
    }
  ],
}, {
  timestamps: true
})

issueSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.createdDate = returnedObj.createdAt
    returnedObj.updateDate = returnedObj.updatedAt
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj.createdAt
    delete returnedObj.updatedAt
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Issue = mongoose.model('Issue', issueSchema)
module.exports = Issue
