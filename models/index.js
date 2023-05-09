
const User = require("./User");
const Recipe = require("./Recipe");
const Favorite = require("./Favorite")

Recipe.belongsToMany(User, {
  through: {
    model: Favorite,
    unique: false,
    foreignKey: 'recipe_id',
  },
  as: 'favorite_recipes'
});

User.belongsToMany(Recipe, {
  through: {
    model: Favorite,
    unique: false,
    foreignKey: 'user_id',
  },
  as: 'user_favorite'
});


module.exports = { User, Recipe, Favorite };

