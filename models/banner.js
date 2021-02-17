'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner.belongsTo(models.Category, { foreignKey: 'CategoryId' });
    }
  };
  Banner.init({
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image url cant be null' },
        notEmpty: { msg: 'Image url cant be empty' },
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Status cant be null' }
      }
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};