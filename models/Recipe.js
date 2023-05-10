const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model { }

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calories: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true
    },
    picture_source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    spoon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe",
  }
);

module.exports = Recipe;
