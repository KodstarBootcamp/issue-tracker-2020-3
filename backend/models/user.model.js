const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: { type: 'string', unique: true },
  passwordHash: { type: 'string' },
  email: { type: 'string', unique: true }
  //issues: [{ type: mongoose.SchemaType.ObjectId, ref:Issue }]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.passwordHash
    delete returnedObject.__v
  },
})
const User = mongoose.model('User', userSchema)
module.exports = User
