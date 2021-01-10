const jwt = require('jsonwebtoken')
const config = require('./config')
const objCleaner = obj => {
  Object.getOwnPropertyNames(obj).forEach(property => {
    if (obj[property] === null || obj[property] === undefined){
      delete obj[property]
    }
  })
}

const checkToken = (request) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  return decodedToken
}

const existanceError = (obj, res) => {
  /**
   * @obj object /{ a }
   * @res response object
   * if a is null or undef response error
   */
  const name = Object.getOwnPropertyNames(obj)[0]
  if (obj[name] === null || obj[name] === undefined){
    return res.status(404).json({ error:`${name} not found` }).end()
  }
}
module.exports = {
  objCleaner,
  checkToken,
  existanceError
}
