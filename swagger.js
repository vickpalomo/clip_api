const swaggerJsDoc = require('swagger-jsdoc')
require('dotenv').config()

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Clip API',
      version: '1.0.0',
      description:
        'Clip API',
      license: {
        name: 'MIT'
      },
      contact: {
        name: 'Swagger'
      }
    },
    schemes: ['http'],
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT}`
      }
    ]
  },
  apis: ['./routes/*.js', './routes.js', './app.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = swaggerDocs
