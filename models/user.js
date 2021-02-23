'use strict';
const {
  Model
} = require('sequelize');

const { hashing } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: 'UserId' });
      User.belongsTo(models.Role, { foreignKey: 'RoleId' });
      User.hasOne(models.Order, { foreignKey: 'UserId' });
      User.hasMany(models.Wishlist, {foreignKey: 'UserId'});
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email has been used' },
      validate: {
        notNull: { msg: 'Email cant be null' },
        notEmpty: { msg: 'Email cant be empty' },
        isEmail: { msg: 'Invalid format email' }
      }
    },
    password: DataTypes.STRING,
    RoleId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user, opt) => {
        let hash = hashing(user.password);
        user.password = hash;
        user.RoleId = 2;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};