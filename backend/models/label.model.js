const mongoose = require('mongoose')

const Schema = mongoose.Schema

const labelSchema = new Schema({
  text: { type: String, required: true, unique: true },
  color: { type: String }
})

labelSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Label = mongoose.model('Label', labelSchema)
module.exports = Label
