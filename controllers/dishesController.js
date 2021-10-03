const db = require('../models')
const { isUuid } = require('../tools')

const list = (req, res, next) => {
  db.dishes.findAll({
    attributes: {
      exclude: ['id']
    }
  }).then(dishes => {
    if (dishes.length === 0) res.status(404).send({ code: 404, data: {}, msg: 'Not found' })
    return res.status(200).send({ code: 200, data: dishes, msg: 'Ok' })
  }).catch(e => {
    next(e)
  })
}

const detail = (req, res, next) => {
  const uuid = req.params.uuid
  if (!isUuid(uuid)) {
    return res.status(400).send({ code: 400, data: {}, msg: 'Uuid bad formated' })
  }
  db.dishes.findOne({
    attributes: {
      exclude: ['id']
    },
    where: {
      uuid
    }
  }).then(dish => {
    if (!dish) return res.status(404).send({ code: 404, data: {}, msg: 'Not found' })
    return res.status(200).send({ code: 200, data: dish, msg: 'Ok' })
  }).catch(e => {
    next(e)
  })
}

const create = (req, res, next) => {
  const data = ['name', 'description', 'price', 'kind_food', 'status']
  const body = Object.keys(req.body)
  const validate = data.filter(item => !body.includes(item))
  if (validate.length !== 0) return res.status(400).send({ code: 400, data: {}, msg: `${validate.join(',')} are required` })
  const { name, description, price, kind_food, status } = req.body
  db.dishes.create({
    name,
    description,
    price,
    kind_food,
    status
  }).then(dish => {
    return res.status(200).send({ code: 200, data: dish, msg: 'Created' })
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
  const data = ['name', 'description', 'price', 'kind_food', 'status'].reduce((custom, item) => {
    if (dataUpdate.includes(item)) custom[item] = req.body[item]
    return custom
  }, {})
  if (Object.keys(data).length === 0) return res.status(400).send({ code: 400, data: {}, msg: 'No data for update' })
  db.dishes.findOne({
    where: {
      uuid
    }
  }).then(dish => {
    if (!dish) {
      const e = new Error('dish not found')
      e.type = 404
      throw e
    }
    return db.dishes.update(data, {
      where: {
        uuid
      }
    })
  }).then(rows => {
    if (rows === 0) return res.status(400).send({ code: 400, data: {}, msg: 'No update' })
    return res.status(201).send({ code: 201, data: {}, msg: 'dish updated' })
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
