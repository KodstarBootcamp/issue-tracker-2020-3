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

const createFilterObj = (req) => {
  const filter = {}
  req.query.title && (filter.title = req.query.title)
  // req.query.state && filter.state(req.query.state)
  if (req.query.creation) {
    const start = new Date(req.query.creation)
    const end = new Date(req.query.creation)
    start.setUTCHours(0,0,0,0)
    end.setUTCHours(23,59,59,999)
    filter.createdAt = { $gte:start, $lte:end }
  }
  return filter
}
module.exports = {
  objCleaner,
  checkToken,
  createFilterObj
}
