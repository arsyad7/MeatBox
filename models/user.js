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
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    alamat: DataTypes.STRING,
    email: DataTypes.STRING
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