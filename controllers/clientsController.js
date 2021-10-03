const db = require('../models')
const { isUuid } = require('../tools')

const list = (req, res, next) => {
  db.clients.findAll()
    .then(clients => {
      if (clients.length === 0) res.status(404).send({ code: 404, data: {}, msg: 'Not found' })
      return res.status(200).send({ code: 200, data: clients, msg: 'Ok' })
    }).catch(e => {
      next(e)
    })
}

const detail = (req, res, next) => {
  const uuid = req.params.uuid
  if (!isUuid(uuid)) {
    return res.status(400).send({ code: 400, data: {}, msg: 'Uuid bad formated' })
  }
  db.clients.findOne({
    where: {
      uuid
    }
  }).then(client => {
    if (!client) return res.status(404).send({ code: 404, data: {}, msg: 'Not found' })
    return res.status(200).send({ code: 200, data: client, msg: 'Ok' })
  }).catch(e => {
    next(e)
  })
}

const create = (req, res, next) => {
  const data = ['name', 'email', 'address', 'telephone']
  const body = Object.keys(req.body)
  const validate = data.filter(item => !body.includes(item))
  if (validate.length !== 0) return res.status(400).send({ code: 400, data: {}, msg: `${validate.join(',')} are required` })
  const { name, email, address, telephone } = req.body
  db.clients.findOne({
    where: {
      email: email
    }
  }).then(client => {
    if (client) {
      const e = new Error('Email exist already')
      e.type = 400
      throw e
    }
    return db.clients.create({
      name,
      email,
      address,
      telephone
    })
  }).then(client => {
    return res.status(201).send({ code: 200, data: client, msg: 'Created' })
  }).catch(e => {
    next(e)
  })
}

const update = (req, res, next) => {
  const uuid = req.params.uuid
  if (!isUuid(uuid)) {
    return res.status(400).send({ code: 400, data: {}, msg: 'Uuid bad formated' })
  }
  const dataUpdate = Object.keys(req.body)
  const data = ['name', 'address', 'telephone'].reduce((custom, item) => {
    if (dataUpdate.includes(item)) custom[item] = req.body[item]
    return custom
  }, {})
  if (Object.keys(data).length === 0) return res.status(400).send({ code: 400, data: {}, msg: 'No data for update' })
  db.clients.findOne({
    attributes: ['name', 'address', 'telephone'],
    where: {
      uuid
    }
  }).then(client => {
    if (!client) {
      const e = new Error('Client not found')
      e.type = 404
      throw e
    }
    return db.clients.update(data, {
      where: {
        uuid
      }
    })
  }).then(rows => {
    if (rows === 0) return res.status(400).send({ code: 400, data: {}, msg: 'No update' })
    return res.status(400).send({ code: 201, data: {}, msg: 'Client updated' })
  }).catch(e => {
    next(e)
  })
}

module.exports = {
  list,
  detail,
  create,
  update
}
