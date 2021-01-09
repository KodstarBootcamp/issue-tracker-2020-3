const jwt = require('jsonwebtoken')
const config = require('./config')
const objCleaner = obj => {
  Object.getOwnPropertyNames(obj).forEach(property => {
    if (obj[property] === null || obj[property] === undefined){
      delete obj[property]
    }
  })
}

const checkToken = (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).send('token missing or invalid' ).end()
  }
  return decodedToken
}

module.exports = {
  objCleaner,
  checkToken
}
