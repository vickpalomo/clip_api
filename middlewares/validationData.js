const Ajv = require('ajv')
const schema = require('../schemas/orderSchema')

const validateSchema = (req, res, next) => {
  const ajv = new Ajv()
  const valid = ajv.validate(schema, req.body)
  if (!valid) {
    return res.status(400).send({ code: 400, data: {}, msg: 'Data bad formated' })
  }
  next()
}

module.exports = {
  validateSchema
}
