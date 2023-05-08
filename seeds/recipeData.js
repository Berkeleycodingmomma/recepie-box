const {
    Recipe
} = require("../models");

//below is the first recipe blog recipe box and then more mock up ones for demo

const recipeData = [{
        title: "First Blog Recipe",
        content: "This is the content of the first blog recipe.",
        user_id: 1,
    },
    {
        title: "Second Blog recipe",
        content: "This is the content of the second blog recipe.",
        user_id: 2,
    },
    {
        title: "Third Blog recipe",
        content: "This is the content of the third blog recipe.",
        user_id: 3,
    },
    {
        title: "Fourth Blog recipe",
        content: "This is the content of the fourth blog recipe.",
        user_id: 4,
    },
    {
        title: "Fifth Blog recipe",
        content: "This is the content of the fifth blog recipe.",
        user_id: 5,
    }
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;
