'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    comments.belongsTo(models.posts, {foreignKey:"post_id",as:"postComment"})
    comments.belongsTo(models.users, {foreignKey:"user_id",as:"userComment"})
    }
  }
  comments.init({
    comment_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    post_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:"posts",
        key:"post_id"
      }
    },
    phrase: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};