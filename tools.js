const parserError = (errors) => {
  const data = errors.map(item => {
    return item.message
  }).join('. ')
  return data
}

const isUuid = (uuid) => {
  return uuid.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')
}

module.exports = {
  parserError,
  isUuid
}
