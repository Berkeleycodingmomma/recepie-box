// Below I am importing the necessary models
const User = require("./User");
const Recipe = require("./Recipe");
const Favorite = require("./Favorite")

// Below I am the relationships between the models
User.hasMany(Recipe, {
    foreignKey: "user_id" // foreign key relationship
  });

  User.hasMany(Favorite, {
    foreignKey: "favorite_id", // foreign key relationship
    onDelete: 'CASCADE'
  });
    
  Recipe.belongsTo(User, {
    foreignKey: "user_id" // foreign key relationship
  });
  
  Favorite.belongsTo(User, {
    foreignKey: "user_id" // foreign key relationship
  });

  Recipe.belongsToMany(User, {
    through: {
      model: favorite,
      unique: false
    },
    as: 'favorite_recipes'
  });
  

  module.exports = { User, Recipe, Favorite };
  
  