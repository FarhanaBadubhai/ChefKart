'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.hasMany(models.Post, { foreignKey: 'userId', as: 'Posts' });
      }
      
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      mobileNumber: { type: DataTypes.BIGINT, unique: true, allowNull: false },
      address: DataTypes.TEXT,
      postCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    { sequelize, modelName: 'User' }
  );
  return User;
};
