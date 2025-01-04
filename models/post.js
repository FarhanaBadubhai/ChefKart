'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
        Post.belongsTo(models.User, { foreignKey: 'userId', as: 'User' });
    }
    
      
  }
  Post.init(
    {
      title: { type: DataTypes.TEXT, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      images: { type: DataTypes.JSONB, allowNull: true }, // JSON array
    },
    { sequelize, modelName: 'Post' }
  );
  return Post;
};
