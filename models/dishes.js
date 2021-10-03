'use strict'

module.exports = (sequelize, DataTypes) => {
  const dishes = sequelize.define('dishes', {
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description cant be empty'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'price bad formated'
        },
        min: {
          args: [0],
          msg: 'price cant be less than 0'
        }
      }
    },
    kind_food: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Mexicana', 'Italiana', 'Japonesa']],
          msg: 'kind food must be Mexicana, Italiana o Japonesa'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Disponible', 'No Disponible']],
          msg: 'status must be Disponible o No Disponible'
        }
      }
    }
  }, {
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    paranoid: true,
    tableName: 'dishes'
  })
  dishes.associate = function (models) {
    dishes.hasMany(models.orders_detail, { sourceKey: 'uuid', foreignKey: 'dish_uuid' })
  }
  return dishes
}
