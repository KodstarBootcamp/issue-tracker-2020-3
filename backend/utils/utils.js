const jwt = require('jsonwebtoken')
const config = require('./config')

/**
 * delete all undef and null properties of an object
 * @param {Object} obj Object
 */
const objCleaner = obj => {
  Object.getOwnPropertyNames(obj).forEach(property => {
    if (obj[property] === null || obj[property] === undefined){
      delete obj[property]
    }
  })
}

/**
   * checks auth token,
   *
   * if succeed return decoded token object,
   * else throws jwt error,
   *  @param request request,
   */
const checkToken = (request) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
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

/**
   * Expect an object with one property
   *
   * if the property is null or undefined → response error
   * @param {Object} obj: a wrapped variable
   * @param {Response} res: response
   */
const existanceError = (obj, res) => {
  const name = Object.getOwnPropertyNames(obj)[0]
  if (obj[name] === null || obj[name] === undefined){
    return res.status(404).json({ error:`${name} not found` }).end()
  }
}

module.exports = {
  objCleaner,
  checkToken,
  createFilterObj,
  existanceError
}
