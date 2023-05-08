const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Favorite extends Model {}
//Below I am defining the structure and properties of the Comment object.
Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {  //foreign key
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
    Spoon_ID: { //foreign key
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "post",
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
  
  module.exports = Favorite;