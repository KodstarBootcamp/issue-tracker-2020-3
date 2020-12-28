const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  labels: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Label'
    }
  ]

})

issueSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.createdDate = returnedObj.createdAt
    returnedObj.updateDate = returnedObj.updatedAt
    delete returnedObj.createdAt
    delete returnedObj.updatedAt
  }
})

const Issue = mongoose.model('Issue', issueSchema)
module.exports = Issue
