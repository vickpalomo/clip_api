const express = require('express')
const app = express()
const port = process.env.APP_PORT || '3000'

const compression = require('compression')
const morgan = require('morgan')
const routes = require('./routes.js')
const cors = require('cors')
const swaggerDocs = require('./swagger.js')
const swaggerUi = require('swagger-ui-express')
const helmet = require('helmet')
require('dotenv').config()

const logType = process.env.MORGAN_LOG_TYPE || 'combined'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(morgan(logType))
app.use(express.static('public'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/documentation', express.static('out'))
app.use('/api/v1', routes)

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`API listening at http://localhost:${port}`))
}

module.exports = app
