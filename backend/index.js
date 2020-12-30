const app = require('./server')
const config = require('./utils/config')
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on http://localhost:${config.PORT}`)
})
