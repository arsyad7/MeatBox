'use strict';
const {
  Model
} = require('sequelize');
const {hashPass} = require('../helpers/hashPass');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through: 'UserProduct'});
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name Tidak Boleh Kosong'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Username Tidak Boleh Kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password Tidak Boleh Kosong'
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Phone Number Tidak Boleh Kosong'
        }
      }
    },
    alamat: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'AlamatTidak Boleh Kosong'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email Tidak Boleh Kosong'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance) {
        instance.password = hashPass(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};