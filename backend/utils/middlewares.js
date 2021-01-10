const logger = require('./logger')
const util = require('util')

const requestLogger = (request, response, next) => {
  logger.info(
    '-----',
    `Method: ${request.method}`,
    `Path: ${request.path}`,
    `Body: ${util.inspect(request.body, false, null)}`,
    '-----'
  )
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send('unknown endpoint')
}
const setRequestToken = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json({ error:'Invalid ID supplied' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error:'Validation exception' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error:'Invalid token' })
  } else if (error.name === 'MongoError' && error.code === 11000) {
    let obj = 'Object'
    if (request.path.startsWith('/users')) {
      obj = 'Username or email'
    } else if (request.path.startsWith('/issue')) {
      obj = 'Issue'
    } else if (request.path.startsWith('/label')) {
      obj = 'Label'
    }
    return response.status(409).json({ error:`${obj} already exist. Dup value: ${error.message.split('"')[1]}` })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  setRequestToken
}
