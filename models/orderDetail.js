'use strict'

module.exports = (sequelize, DataTypes) => {
  const orders_detail = sequelize.define('orders_detail', {
    uuid: {
      type: DataTypes.UUID
    },
    order_uuid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dish_uuid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'unit price bad formated'
        },
        min: {
          args: [0],
          msg: 'price cant be less than 0'
        }
      }
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'subtotal bad formated'
        },
        min: {
          args: [0],
          msg: 'subtotal be less than 0'
        }
      }
    }
  }, {
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true,
    tableName: 'orders_detail'
  })
  orders_detail.associate = function (models) {
    orders_detail.belongsTo(models.orders, { targetKey: 'uuid', foreignKey: 'order_uuid' })
    orders_detail.belongsTo(models.dishes, { targetKey: 'uuid', foreignKey: 'dish_uuid' })
  }
  return orders_detail
}
