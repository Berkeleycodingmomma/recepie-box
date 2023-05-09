
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}
//Below I am defining the structure and properties of the Comment object.
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    Recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "recipe",
        key: "id",
      },
    },
  },
  {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: "comment",
  }
  );
  
  module.exports = Comment;