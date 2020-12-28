const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true }
}, {
  timestamps: true,

  labels: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Label'
    }
  ]

})

issueSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Issue = mongoose.model('Issue', issueSchema)
module.exports = Issue
