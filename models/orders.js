'use strict'

module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    uuid: {
      type: DataTypes.UUID
    },
    client_uuid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'address cant be empty'
        }
      }
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'total bad formated'
        },
        min: {
          args: [0],
          msg: 'total cant be less than 0'
        }
      }
    }
  }, {
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true,
    tableName: 'orders'
  })
  orders.associate = function (models) {
    orders.belongsTo(models.clients, { targetKey: 'uuid', foreignKey: 'client_uuid' })
    orders.hasMany(models.orders_detail, { sourceKey: 'uuid', foreignKey: 'order_uuid'})
  }
  return orders
}
