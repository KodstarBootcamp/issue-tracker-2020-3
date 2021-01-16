const mongoose = require('mongoose')
const Schema = mongoose.Schema

const stateSchema = new Schema({
  name: { type: String, required: true, unique: true },
  order_no: { type:Number, required:true, unique: true },
  issues: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Issue'
    }
  ]
})

stateSchema.set('toJSON', {
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

const Issue = mongoose.model('State', stateSchema)
module.exports = Issue
