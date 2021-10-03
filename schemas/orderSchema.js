const schema = {
  type: 'object',
  required: ['client_uuid', 'client_address', 'dishes'],
  properties: {
    client_uuid: { type: 'string', minLength: 1 },
    client_address: { type: 'string', minLength: 1 },
    dishes: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['quantity', 'uuid'],
        properties: {
          quantity: { type: 'number', minimum: 1 },
          uuid: { type: 'string', minLength: 1 }
        }
      }
    }
  }
}

module.exports = schema
