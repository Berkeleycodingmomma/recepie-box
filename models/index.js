// Below I am importing the necessary models
const User = require("./User");
const Recipe = require("./Recipe");
const Favorite = require("./Favorite")

// Below I am the relationships between the models
User.hasMany(Recipe, {
    foreignKey: "user_id", // foreign key relationship
  });
  
  Recipe.belongsTo(User, {
    foreignKey: "user_id", // foreign key relationship
  });
  
  module.exports = { User, Recipe, Favorite };
  