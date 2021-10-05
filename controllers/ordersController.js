const db = require('../models')
const { Op } = require('sequelize')
const { sequelize } = require('../models')

const create = async (req, res, next) => {
  const date = new Date()
  if (date.getHours() < 16 || date.getHours() >= 21) return res.status(400).send({ code: 400, data: {}, msg: 'Out of time' })
  try {
    const client = await db.clients.findOne({
      where: {
        uuid: req.body.client_uuid
      }
    })
    if (!client) {
      const e = new Error('Client not found')
      e.type = 404
      throw e
    }
    const arrayDishesUuid = req.body.dishes.map(item => item.uuid)
    const dishes = await db.dishes.findAll({
      where: {
        uuid: {
          [Op.in]: arrayDishesUuid
        }
      }
    })
    if (dishes.length !== arrayDishesUuid.length) {
      const e = new Error('Dish not found')
      e.type = 404
      throw e
    }
    const minimunDishes = req.body.dishes.reduce((custom, item) => {
      custom = item.quantity + custom
      return custom
    }, 0)
    if (minimunDishes < 2) {
      const e = new Error('2 dishes minimun')
      e.type = 404
      throw e
    }

    await sequelize.transaction(async (t) => {
      const data = dishes.reduce((custom, item) => {
        const { quantity } = req.body.dishes.find(dish => dish.uuid === item.uuid)
        const subtotal = quantity * item.price
        const dataDish = {
          quantity: quantity,
          dish_uuid: item.uuid,
          unit_price: item.price,
          subtotal: subtotal
        }
        custom.detail.push(dataDish)
        custom.total = custom.total + subtotal
        return custom
      }, { detail: [], total: 0 })
      const order = await db.orders.create({
        client_uuid: req.body.client_uuid,
        client_address: req.body.client_address,
        total: data.total
      }, { transaction: t })
      const details = data.detail.map(item => {
        item.order_uuid = order.uuid
        return item
      })
      await db.orders_detail.bulkCreate(details, { transaction: t })
    })
    return res.status(201).send({ code: 201, data: {}, msg: 'Ok' })
  } catch (e) {
    next(e)
  }
}

const report = (req, res, next) => {
  const { start_date, end_date } = req.query
  if (!start_date || !end_date) return res.status(400).send({ code: 400, data: {}, msg: 'Missing Params. Should be yyyy-mm-dd' })
  const RegExPattern = /^\d{4}\-\d{2}\-\d{2}$/
  if (!start_date.match(RegExPattern) || !end_date.match(RegExPattern)) return res.status(400).send({ code: 400, data: {}, msg: 'Date bad formated' })
  const query = 'SELECT sum(o.quantity) total, d.kind_food as tipo FROM orders_detail o left join dishes d on d.uuid = o.dish_uuid where o.created_at::date between :start_date and :end_date group by d.kind_food'
  sequelize.query(query, {
    replacements: {
      start_date: start_date,
      end_date: end_date
    }
  }).then(dishes => {
    return res.status(200).send({ code: 200, data: dishes[0], msg: 'Ok' })
  }).catch(e => {
    next(e)
  })
}

module.exports = {
  create,
  report
}
