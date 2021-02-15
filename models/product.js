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
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Category, { through: models.ProductCategory, foreignKey: 'ProductId' });
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Product name cant be null' },
        notEmpty: { msg: 'Product name cant be empty' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Product price cant be null' },
        notEmpty: { msg: 'Product price cant be empty' },
        isInt: { msg: 'Product price must be number' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image url cant be null' },
        notEmpty: { msg: 'Image url cant be empty' },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Product stock cant be null' },
        notEmpty: { msg: 'Product stock cant be empty' },
        isInt: { msg: 'Product stock must be number' }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};