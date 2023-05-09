const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",

        unique: false

      },
    },
    recipe_id: { //foreign key
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'recipe',
        key: 'id',
        unique: false
      }

    }
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "favorite",
  }
);

module.exports = Favorite;
