const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.js'))[env]
const db = {}
const pg = require('pg')
pg.types.setTypeParser(1082, 'text', function (text) { return dayjs(text).format('YYYY-MM-DD HH:mm:ss') })
pg.types.setTypeParser(1184, 'text', function (text) { return dayjs(text).format('YYYY-MM-DD HH:mm:ss') })
pg.types.setTypeParser(1114, 'text', function (text) { return dayjs(text).format('YYYY-MM-DD HH:mm:ss') })

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  const options = {
    host: config.host,
    dialectOptions: {
      useUTC: false // for reading
    },
    dialect: config.dialect,
    timezone: '-06:00' // for writing
  }
  sequelize = new Sequelize(config.database, config.username, config.password, options)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
