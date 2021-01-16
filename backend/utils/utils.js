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
   * checks auth token. if succeed return decoded token object, else response jwt error
   * @param {Request} request request
   * @returns {Object} decoded token
   */
const checkToken = (request) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  return decodedToken
}

/**
 * creates a filter object from request
 *
 * Available filter fields:
 * - body.labels: list of ID labels
 * - query: title, titleContains state, creation, modification, assignee, createdby.
 * @param {Request} req request
 * @param {Response} res response
 */
const createFilter = (req) => {
  const filter = {}
  if (req.body.labels && req.body.labels.length) {
    filter.$and = []
    for (let i = 0; i < req.body.labels.length; i++) {
      filter.$and.push({ labels: { $elemMatch:{ $eq:req.body.labels[i] } } })
    }
  }
  req.query.titleContains && (filter.title = { $regex:'.*' + req.query.titleContains + '.*' })
  req.query.title && (filter.title = req.query.title)
  req.query.assignee && (filter.assignees = { $elemMatch:{ $eq:req.query.assignee } })
  req.query.createdby && (filter.createdBy = req.query.createdby)
  req.query.state && (filter.state = req.query.state)
  if (req.query.creation) {
    const start = new Date(req.query.creation)
    const end = new Date(req.query.creation)
    start.setUTCHours(0, 0, 0, 0)
    end.setUTCHours(23, 59, 59, 999)
    filter.createdAt = { $gte:start, $lte:end }
  }
  if (req.query.modification) {
    const start = new Date(req.query.modification)
    const end = new Date(req.query.modification)
    start.setUTCHours(0, 0, 0, 0)
    end.setUTCHours(23, 59, 59, 999)
    filter.updatedAt = { $gte:start, $lte:end }
  }
  return filter
}

/**
 * if date queries invalid responses error
 * @param {Request} req request
 * @param {Response} res response
 * @returns {Response | void}
 */
const validateDateError = (req, res) => {
  if (req.query.creation) {
    const date = new Date(req.query.creation)
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Unsupported time format. Available format: ISO' })
    }
  }
  if (req.query.modification) {
    const date = new Date(req.query.modification)
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Unsupported time format. Available format: ISO' })
    }
  }
}

/**
   * Expect an object with one property
   *
   * if the property is null or undefined → response error
   * @param {Object} obj: a wrapped variable
   * @param {Response} res: response
   * @returns {Response | void}
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
  createFilter,
  existanceError,
  validateDateError
}
