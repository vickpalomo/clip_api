const express = require('express')
require('dotenv').config()
const clients = require('./routes/clients')
const dishes = require('./routes/dishes')
const orders = require('./routes/orders')

const router = express.Router()

router.use('/clients', clients)
router.use('/dishes', dishes)
router.use('/orders', orders)

module.exports = router
