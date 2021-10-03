'use strict'

module.exports = (sequelize, DataTypes) => {
  const clients = sequelize.define('clients', {
    uuid: {
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name cant be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'email cant be empty'
        },
        isEmail: {
          msg: 'email bad formated'
        }
      }
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isEmpty (value) {
          if (Object.keys(value).length === 0) throw new Error('address cant be empty object')
        }
      }
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'telephone should be numeric'
        },
        len: {
          args: [10, 10],
          msg: 'telephone should be 10 digits long'
        }
      }
    }
  }, {
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true,
    tableName: 'clients'
  })
  clients.associate = function (models) {
    clients.hasMany(models.orders, { sourceKey: 'uuid', foreignKey: 'client_uuid' })
  }
  return clients
}
