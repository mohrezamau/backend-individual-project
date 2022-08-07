'use strict';
const {
  Model
} = require('sequelize');
const { post } = require('../routers/posts');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts.hasMany(models.comments,{foreignKey:"post_id", as:"postComment"})
      posts.hasMany(models.likes,{foreignKey:"post_id",as:"postLike"})
      posts.belongsTo(models.users, { foreignKey: "user_id",as:"userPost"});    
    }
  }
  posts.init({
    post_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
    },
  },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },{
    sequelize,
    modelName: 'posts',
  }
  );
  return posts;
};