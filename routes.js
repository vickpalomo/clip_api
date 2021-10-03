const express = require('express')
require('dotenv').config()
const clients = require('./routes/clients')
const dishes = require('./routes/dishes')

const router = express.Router()

router.use('/clients', clients)
router.use('/dishes', dishes)

module.exports = router
