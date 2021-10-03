'use strict'
const withDateNoTz = require('sequelize-date-no-tz-postgres')

module.exports = {
  up: (queryInterface, SequelizeBase) => {
    const Sequelize = withDateNoTz(SequelizeBase)
    return queryInterface.createTable('dishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      kind_food: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.literal('now()')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE_NO_TZ,
        defaultValue: Sequelize.literal('now()')
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE_NO_TZ,
        defaultValue: null
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dishes')
  }
}
