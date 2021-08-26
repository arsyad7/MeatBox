'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static getTotalPrice(data) {
      let totalPrice = 0
      data.forEach(product => {
          totalPrice += product.totalHarga
      })
      return totalPrice
    }

    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {through: 'UserProduct'});
    }
  };
  Product.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.STRING
  }, {
    hooks: {
      afterDestroy(product) {
        product.stock + 1
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};