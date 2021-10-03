const express = require('express')
require('dotenv').config()
const clients = require('./routes/clients')

const router = express.Router()

router.use('/clients', clients)

module.exports = router
