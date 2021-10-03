const { parserError } = require('../tools')

const errorHandler = (err, req, res, next) => {
  console.error(err)
  if (err.type) return res.status(err.type).send({ code: err.type, msg: err.message, data: {} })
  if (err.errors) {
    const errors = parserError(err.errors)
    return res.status(400).send({ code: 400, data: {}, msg: errors })
  }
  return res.status(500).send({ code: 500, data: {}, msg: 'Internal Server Error' })
}

module.exports = {
  errorHandler
}
